// Client-side interactions — ported from the design prototype, adapted to
// multi-page routing. Runs on every page load.

// -- Nav condense on scroll -------------------------------------------------
function initNavCondense() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const condense = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y > 40) {
      nav.style.padding = '12px 40px';
      nav.style.background = 'rgba(18,21,25,.97)';
      nav.style.boxShadow = '0 2px 24px rgba(0,0,0,.5)';
    } else {
      nav.style.padding = '20px 40px';
      nav.style.background = 'linear-gradient(180deg,rgba(15,18,22,.85),rgba(15,18,22,0))';
      nav.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', condense, { passive: true });
  condense();
}

// -- Mobile hamburger -------------------------------------------------------
function initBurger() {
  const burger = document.querySelector<HTMLElement>('.nav-burger');
  const links = document.querySelector<HTMLElement>('.nav-links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    const open = links.hasAttribute('data-open');
    if (open) {
      links.removeAttribute('data-open');
      burger.removeAttribute('data-open');
    } else {
      links.setAttribute('data-open', '');
      burger.setAttribute('data-open', '');
    }
  });
}

// -- Scroll reveal ----------------------------------------------------------
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-seen])');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.setAttribute('data-seen', '1');
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
  // safety: reveal anything already in view after a moment
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-seen])').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.setAttribute('data-seen', '1');
      }
    });
  }, 700);
}

// -- Equipment tabs (Tækjakostur only) -------------------------------------
function initEquipmentTabs() {
  const tabs = document.querySelectorAll<HTMLElement>('[data-taeki]');
  const panels = document.querySelectorAll<HTMLElement>('[data-taeki-panel]');
  if (!tabs.length) return;

  const paint = (active: string) => {
    tabs.forEach((el) => {
      const on = el.dataset.taeki === active;
      el.style.background = on ? '#3778c2' : 'transparent';
      el.style.borderColor = on ? '#3778c2' : 'rgba(238,241,244,.2)';
    });
    panels.forEach((p) => {
      p.style.display = p.dataset.taekiPanel === active ? 'block' : 'none';
    });
  };

  tabs.forEach((el) => el.addEventListener('click', () => paint(el.dataset.taeki!)));
  paint('grofur');
}

// -- Quote form -------------------------------------------------------------
// Sends directly via Web3Forms when PUBLIC_WEB3FORMS_KEY is configured;
// falls back to a mailto: draft when it isn't (e.g. key not set up yet).
function initQuoteForm() {
  const btn = document.querySelector<HTMLElement>('[data-quote-submit]');
  if (!btn) return;
  const g = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value ?? '';
  const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

  btn.addEventListener('click', async () => {
    const nafn = g('q-nafn').trim();
    const simi = g('q-simi').trim();
    const net = g('q-netfang').trim();
    const teg = g('q-tegund');
    const stad = g('q-stadur').trim();
    const lys = g('q-lysing').trim();
    const status = document.getElementById('q-status');
    if (!nafn || (!simi && !net)) {
      if (status) {
        status.style.color = '#e0794f';
        status.textContent = 'Vinsamlegast fylltu út nafn og síma eða netfang.';
      }
      return;
    }
    const body =
      'Nafn: ' + nafn + '\nSími: ' + simi + '\nNetfang: ' + net +
      '\nTegund verks: ' + teg + '\nStaðsetning: ' + stad + '\n\nLýsing:\n' + lys;

    if (accessKey) {
      btn.setAttribute('disabled', '');
      btn.style.opacity = '.6';
      if (status) {
        status.style.color = '#9aa2ab';
        status.textContent = 'Sendi…';
      }
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: 'Fyrirspurn um tilboð – ' + nafn,
            from_name: nafn,
            replyto: net || undefined,
            message: body,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'send failed');
        if (status) {
          status.style.color = '#6fbf7a';
          status.textContent = 'Takk! Fyrirspurnin er send — við höfum samband fljótlega.';
        }
        ['q-nafn', 'q-simi', 'q-netfang', 'q-stadur', 'q-lysing'].forEach((id) => {
          const el = document.getElementById(id) as HTMLInputElement | null;
          if (el) el.value = '';
        });
        return;
      } catch {
        if (status) {
          status.style.color = '#e0794f';
          status.textContent = 'Sending mistókst — reyndu aftur eða hringdu í okkur.';
        }
        return;
      } finally {
        btn.removeAttribute('disabled');
        btn.style.opacity = '1';
      }
    }

    // fallback: open a pre-filled draft in the visitor's mail app
    const email = btn.dataset.quoteEmail || 'ths@thsverk.is';
    const url =
      'mailto:' + email + '?subject=' +
      encodeURIComponent('Fyrirspurn um tilboð – ' + nafn) +
      '&body=' + encodeURIComponent(body);
    if (status) {
      status.style.color = '#6fbf7a';
      status.textContent = 'Takk! Póstforritið þitt opnast — smelltu senda til að ljúka fyrirspurninni.';
    }
    window.location.href = url;
  });
}

initNavCondense();
initBurger();
initReveal();
initEquipmentTabs();
initQuoteForm();
