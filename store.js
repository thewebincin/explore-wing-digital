'use strict';
/**
 * store.js — Explore Wings Live Data & Character Editor Engine
 * Handles:
 * 1. Maintenance Mode interception & 503 redirection
 * 2. Dynamic DOM character updates from the Admin Panel
 * 3. 1-Click Interactive On-Page Live Typing Mode (?edit=live or edit button)
 * 4. Client-side lead captures into localStorage
 */
(function() {
  const MAINT_KEY = 'maintenance_mode';
  const BYPASS_KEY = 'ew_preview_live';
  const SECTIONS_KEY = 'ew_custom_sections';
  const ENQUIRIES_KEY = 'ew_enquiries';

  // ==========================================================================
  // 1. MAINTENANCE MODE & PREVIEW LOGIC
  // ==========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('preview') === 'live' || urlParams.get('bypass') === 'ew-preview') {
    localStorage.setItem(BYPASS_KEY, 'true');
  } else if (urlParams.get('preview') === 'off') {
    localStorage.removeItem(BYPASS_KEY);
  }

  const isMaintOn = localStorage.getItem(MAINT_KEY) === 'on';
  const isPreviewLive = localStorage.getItem(BYPASS_KEY) === 'true';
  const isCurrentMaintPage = window.location.pathname.endsWith('maintenance.html');
  const isCurrentAdminPage = window.location.pathname.includes('/admin');

  if (!isCurrentAdminPage) {
    if (isMaintOn && !isPreviewLive && !isCurrentMaintPage) {
      const prefix = window.location.pathname.includes('/admin') ? '../' : './';
      window.location.replace(prefix + 'maintenance.html');
      return;
    }
    if (!isMaintOn && isCurrentMaintPage) {
      window.location.replace('./index.html');
      return;
    }
  }

  // ==========================================================================
  // 2. DOM CONTENT REPLACEMENT FROM ADMIN STORAGE (CHARACTER-BY-CHARACTER)
  // ==========================================================================
  function applyCustomText() {
    try {
      const data = JSON.parse(localStorage.getItem(SECTIONS_KEY) || '{}');
      if (!data) return;

      // 1. Top Announcement
      if (data.home_announcement) {
        const el = document.querySelector('.top-announcement-msg span:nth-child(2)');
        if (el) el.textContent = data.home_announcement;
      }

      // 2. Hero Badge Pill
      if (data.home_hero_badge) {
        const el = document.querySelector('.hero-brand-pill-text');
        if (el) el.textContent = data.home_hero_badge;
      }

      // 3. Hero Headline
      if (data.home_hero_title) {
        const el = document.querySelector('.hero-section h1.display-xl');
        if (el) {
          // If the user entered their own full headline, render it cleanly
          el.innerHTML = data.home_hero_title;
        }
      }

      // 4. Hero Subtext
      if (data.home_hero_subtext) {
        const el = document.querySelector('.hero-subtext');
        if (el) el.textContent = data.home_hero_subtext;
      }

      // 5. Hero Button Text
      if (data.home_hero_btn) {
        const el = document.querySelector('.hero-lead-form button span:first-child');
        if (el) el.textContent = data.home_hero_btn;
      }

      // 6. Hero Trust Row Points
      if (data.home_hero_trust1) {
        const el = document.querySelector('.hero-trust-row span:nth-child(1)');
        if (el) el.innerHTML = `<span class="check">✓</span> ${data.home_hero_trust1}`;
      }
      if (data.home_hero_trust2) {
        const el = document.querySelector('.hero-trust-row span:nth-child(2)');
        if (el) el.innerHTML = `<span class="check">✓</span> ${data.home_hero_trust2}`;
      }
      if (data.home_hero_trust3) {
        const el = document.querySelector('.hero-trust-row span:nth-child(3)');
        if (el) el.innerHTML = `<span class="check">✓</span> ${data.home_hero_trust3}`;
      }

      // 7. Browser Mockup Texts
      if (data.home_browser_url) {
        const el = document.querySelector('.ui-browser-url');
        if (el) el.textContent = data.home_browser_url;
      }
      if (data.home_browser_caption) {
        const el = document.querySelector('.ui-browser-overlay-caption div div:last-child');
        if (el) el.textContent = data.home_browser_caption;
      }

      // 8. Static Logo Strip Header
      if (data.home_static_strip_text) {
        const el = document.querySelector('.static-logo-strip-section span');
        if (el) el.textContent = data.home_static_strip_text;
      }

      // 9. Alternating Services Section
      if (data.home_services_title) {
        const el = document.querySelector('#services-section .section-header h2, .section-header[data-reveal="blur"] h2');
        if (el) el.textContent = data.home_services_title;
      }
      if (data.home_services_desc) {
        const el = document.querySelector('#services-section .section-header p, .section-header[data-reveal="blur"] p');
        if (el) el.textContent = data.home_services_desc;
      }

      // 10. 5-Tab Showcase Section
      if (data.home_tabs_title) {
        const el = document.querySelector('.section.section-tint .section-header h2');
        if (el) el.textContent = data.home_tabs_title;
      }
      if (data.home_tabs_desc) {
        const el = document.querySelector('.section.section-tint .section-header p');
        if (el) el.textContent = data.home_tabs_desc;
      }

      // 11. Brands That Trust Us Section
      if (data.home_brands_title) {
        const el = document.querySelector('#trusted-brands .section-header h2');
        if (el) el.textContent = data.home_brands_title;
      }
      if (data.home_brands_desc) {
        const el = document.querySelector('#trusted-brands .section-header p');
        if (el) el.textContent = data.home_brands_desc;
      }

      // 12. How It Works Section
      if (data.home_process_title) {
        const el = document.querySelector('#how-it-works .section-header h2');
        if (el) el.textContent = data.home_process_title;
      }
      if (data.home_process_desc) {
        const el = document.querySelector('#how-it-works .section-header p');
        if (el) el.textContent = data.home_process_desc;
      }

      // 13. FAQ Section
      if (data.home_faq_title) {
        const el = document.querySelector('#home-faq .section-header h2');
        if (el) el.textContent = data.home_faq_title;
      }
      if (data.home_faq_desc) {
        const el = document.querySelector('#home-faq .section-header p');
        if (el) el.textContent = data.home_faq_desc;
      }

      // 14. Closing CTA Section
      if (data.home_cta_title) {
        const el = document.querySelector('.cta-banner-section h2');
        if (el) el.textContent = data.home_cta_title;
      }
      if (data.home_cta_subtext) {
        const el = document.querySelector('.cta-banner-section p');
        if (el) el.textContent = data.home_cta_subtext;
      }
      if (data.home_cta_btn) {
        const el = document.querySelector('.cta-banner-form button, .cta-banner-section .btn');
        if (el) el.textContent = data.home_cta_btn;
      }

      // 15. Studio Contact Details
      if (data.contact_phone) {
        document.querySelectorAll('a[href^="tel:"]').forEach(a => {
          a.href = `tel:${data.contact_phone.replace(/[^0-9+]/g, '')}`;
          a.textContent = data.contact_phone;
        });
      }
      if (data.contact_email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
          a.href = `mailto:${data.contact_email}`;
          a.textContent = data.contact_email;
        });
      }
      if (data.contact_address) {
        const el = document.querySelector('.footer-col:last-child p:first-of-type');
        if (el) el.innerHTML = data.contact_address.replace(/\n/g, '<br>');
      }
    } catch(err) {
      console.warn('[store.js] Custom text apply note:', err);
    }
  }

  // ==========================================================================
  // 3. IN-PAGE LIVE TYPING & CHARACTER EDITOR
  // ==========================================================================
  function setupInPageEditor() {
    const isEditModeRequested = urlParams.get('edit') === 'live' || localStorage.getItem('ew_live_edit_mode') === 'true';

    // Create floating control bar
    const bar = document.createElement('div');
    bar.id = 'ewLiveEditorBar';
    bar.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      background: #0F172A;
      color: #FFFFFF;
      padding: 10px 20px;
      border-radius: 999px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 0.84rem;
      font-weight: 600;
      border: 1px solid rgba(255,255,255,0.15);
      backdrop-filter: blur(12px);
    `;

    if (isEditModeRequested) {
      enableLiveTyping(bar);
    } else {
      bar.innerHTML = `
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="color:#F59E0B;">✏️</span>
          <span>Admin Editor</span>
        </span>
        <button type="button" id="ewEnableEditBtn" style="background:#E11D2E; color:#FFF; border:none; padding:6px 14px; border-radius:99px; font-weight:700; cursor:pointer; font-size:0.8rem;">
          Click to Edit Characters In-Page
        </button>
        <a href="admin/index.html" style="color:#94A3B8; text-decoration:none; font-size:0.78rem;">
          Open Admin Panel &rarr;
        </a>
      `;
      document.body.appendChild(bar);

      document.getElementById('ewEnableEditBtn').addEventListener('click', () => {
        localStorage.setItem('ew_live_edit_mode', 'true');
        enableLiveTyping(bar);
      });
    }
  }

  function enableLiveTyping(bar) {
    bar.innerHTML = `
      <span style="display:flex; align-items:center; gap:6px; color:#10B981;">
        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10B981; animation:pulse 1.5s infinite;"></span>
        <span><strong>Live In-Page Typing Active:</strong> Click on any headline or text to edit characters directly!</span>
      </span>
      <button type="button" id="ewSaveLiveBtn" style="background:#10B981; color:#0B1020; border:none; padding:6px 16px; border-radius:99px; font-weight:800; cursor:pointer; font-size:0.82rem;">
        💾 Save All Typed Characters
      </button>
      <button type="button" id="ewExitLiveBtn" style="background:transparent; color:#94A3B8; border:1px solid rgba(255,255,255,0.2); padding:6px 12px; border-radius:99px; font-weight:600; cursor:pointer; font-size:0.78rem;">
        Exit Editor
      </button>
      <a href="admin/index.html" style="color:#38BDF8; text-decoration:none; font-size:0.78rem; font-weight:700;">
        Admin Console &rarr;
      </a>
    `;
    if (!document.getElementById('ewLiveEditorBar')) {
      document.body.appendChild(bar);
    }

    // Add contenteditable to all major text nodes
    const editableSelectors = [
      '.top-announcement-msg span:nth-child(2)',
      '.hero-brand-pill-text',
      '.hero-subtext',
      '.hero-lead-form button span:first-child',
      '.static-logo-strip-section span',
      '.section-header h2',
      '.section-header p',
      '.cta-banner-section h2',
      '.cta-banner-section p',
      '.footer-brand-col p'
    ];

    editableSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.setAttribute('contenteditable', 'true');
        el.style.outline = '1.5px dashed rgba(225, 29, 46, 0.4)';
        el.style.outlineOffset = '4px';
        el.style.cursor = 'text';
        el.setAttribute('title', 'Click to edit characters directly');
      });
    });

    // Handle Save All Typed Characters
    document.getElementById('ewSaveLiveBtn').addEventListener('click', () => {
      const data = JSON.parse(localStorage.getItem(SECTIONS_KEY) || '{}');

      const announcement = document.querySelector('.top-announcement-msg span:nth-child(2)');
      if (announcement) data.home_announcement = announcement.textContent.trim();

      const heroBadge = document.querySelector('.hero-brand-pill-text');
      if (heroBadge) data.home_hero_badge = heroBadge.textContent.trim();

      const heroSubtext = document.querySelector('.hero-subtext');
      if (heroSubtext) data.home_hero_subtext = heroSubtext.textContent.trim();

      const heroBtn = document.querySelector('.hero-lead-form button span:first-child');
      if (heroBtn) data.home_hero_btn = heroBtn.textContent.trim();

      const ctaTitle = document.querySelector('.cta-banner-section h2');
      if (ctaTitle) data.home_cta_title = ctaTitle.textContent.trim();

      const ctaSubtext = document.querySelector('.cta-banner-section p');
      if (ctaSubtext) data.home_cta_subtext = ctaSubtext.textContent.trim();

      localStorage.setItem(SECTIONS_KEY, JSON.stringify(data));

      const btn = document.getElementById('ewSaveLiveBtn');
      const originalText = btn.textContent;
      btn.textContent = '✓ Saved Successfully!';
      btn.style.background = '#34D399';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#10B981';
      }, 2000);
    });

    // Handle Exit Editor
    document.getElementById('ewExitLiveBtn').addEventListener('click', () => {
      localStorage.removeItem('ew_live_edit_mode');
      window.location.href = window.location.pathname;
    });
  }

  // ==========================================================================
  // 4. FORM LEAD CAPTURE
  // ==========================================================================
  function setupFormHandlers() {
    const leadForms = document.querySelectorAll('.hero-lead-form, #luxuryContactForm, form[action*="/api/consultation"]');
    leadForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="text"], input[type="email"]');
        const val = input ? input.value : '';
        if (val) {
          const leads = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]');
          leads.unshift({
            contact: val,
            form: form.id || 'hero-lead-form',
            submitted_at: new Date().toISOString()
          });
          localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(leads));
          alert('Thank you! Your enquiry has been received by Explore Wings Digital Technologies.');
          form.reset();
        }
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyCustomText();
      setupInPageEditor();
      setupFormHandlers();
    });
  } else {
    applyCustomText();
    setupInPageEditor();
    setupFormHandlers();
  }
})();
