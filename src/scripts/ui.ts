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
  const setOpen = (open: boolean) => {
    links.toggleAttribute('data-open', open);
    burger.toggleAttribute('data-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  const isOpen = () => links.hasAttribute('data-open');
  burger.addEventListener('click', () => setOpen(!isOpen()));
  // close on Escape, a tap outside the nav, or picking a link
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      burger.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (isOpen() && !burger.contains(e.target as Node) && !links.contains(e.target as Node)) setOpen(false);
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

// -- Scroll reveal ----------------------------------------------------------
function initReveal() {
  // Revealed state lives in CSS ([data-reveal][data-seen]) so :hover styles still win.
  const show = (el: Element) => el.setAttribute('data-seen', '1');
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-seen])');
  if (!('IntersectionObserver' in window)) {
    els.forEach(show);
    return;
  }
  // content already on screen at load shows straight away
  els.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) show(el);
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          show(en.target);
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('[data-reveal]:not([data-seen])').forEach((el) => io.observe(el));
}

// -- Equipment tabs (Tækjakostur only) -------------------------------------
function initEquipmentTabs() {
  const tabs = document.querySelectorAll<HTMLElement>('[data-taeki]');
  const panels = document.querySelectorAll<HTMLElement>('[data-taeki-panel]');
  if (!tabs.length) return;

  const paint = (active: string) => {
    tabs.forEach((el) => {
      const on = el.dataset.taeki === active;
      el.setAttribute('aria-selected', String(on));
      el.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => {
      p.hidden = p.dataset.taekiPanel !== active;
    });
  };

  const list = [...tabs];
  list.forEach((el, i) => {
    el.addEventListener('click', () => paint(el.dataset.taeki!));
    el.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      const next = list[(i + step + list.length) % list.length];
      paint(next.dataset.taeki!);
      next.focus();
    });
  });
  paint(list[0].dataset.taeki!);
}

// -- Quote form -------------------------------------------------------------
// Sends directly via Web3Forms when PUBLIC_WEB3FORMS_KEY is configured;
// falls back to a mailto: draft when it isn't (e.g. key not set up yet).
function initQuoteForm() {
  const form = document.querySelector<HTMLFormElement>('[data-quote-form]');
  const btn = document.querySelector<HTMLElement>('[data-quote-submit]');
  if (!form || !btn) return;
  const g = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value ?? '';
  const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

  const field = (id: string) => document.getElementById(id) as HTMLInputElement | null;
  ['q-nafn', 'q-simi', 'q-netfang'].forEach((id) =>
    field(id)?.addEventListener('input', () => field(id)?.removeAttribute('aria-invalid'))
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nafn = g('q-nafn').trim();
    const simi = g('q-simi').trim();
    const net = g('q-netfang').trim();
    const teg = g('q-tegund');
    const stad = g('q-stadur').trim();
    const lys = g('q-lysing').trim();
    const status = document.getElementById('q-status');
    if (!nafn || (!simi && !net)) {
      const bad = [!nafn && 'q-nafn', !simi && !net && 'q-simi', !simi && !net && 'q-netfang'].filter(Boolean) as string[];
      bad.forEach((id) => field(id)?.setAttribute('aria-invalid', 'true'));
      field(bad[0])?.focus();
      if (status) {
        status.style.color = '#e0794f';
        status.textContent = !nafn
          ? 'Vinsamlegast fylltu út nafn og síma eða netfang.'
          : 'Vinsamlegast fylltu út síma eða netfang svo við getum svarað.';
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
