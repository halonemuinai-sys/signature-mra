/**
 * MRA Email Signature Generator & CMS Engine (Ultra-Modern Edition)
 */

const CDN_BASE = "https://cdn.jsdelivr.net/gh/halonemuinai-sys/signature-mra@main/";

// Brand Logo Database with Categories
const BRANDS_DATABASE = [
  // Luxury & Timepieces
  { id: "bvlgari", name: "BVLGARI", category: "luxury", url: "https://www.bulgari.com", src: "cropped_logos/brand_01_bvlgari.png", w: 70, h: 12 },
  { id: "omega", name: "OMEGA", category: "luxury", url: "https://www.omegawatches.com", src: "cropped_logos/brand_02_omega.png", w: 42, h: 20 },
  { id: "chronologie", name: "Chronologie", category: "luxury", url: "https://www.mra.co.id", src: "cropped_logos/brand_04_chronologie.png", w: 101, h: 20 },
  { id: "atmos", name: "atmos", category: "luxury", url: "https://atmos.co.id", src: "cropped_logos/brand_07_atmos.png", w: 44, h: 10 },
  // F&B
  { id: "haagendazs", name: "Häagen-Dazs", category: "fnb", url: "https://www.haagendazs.co.id", src: "cropped_logos/brand_06_haagendazs.png", w: 53, h: 25 },
  { id: "jamba", name: "Jamba", category: "fnb", url: "https://www.jamba.com", src: "cropped_logos/brand_05_jamba.png", w: 53, h: 19 },
  { id: "hardrock", name: "Hard Rock Cafe", category: "fnb", url: "https://www.hardrockcafe.com/location/jakarta/", src: "cropped_logos/brand_16_hardrock.png", w: 38, h: 30 },
  // Media & Digital
  { id: "artjakarta", name: "Art Jakarta", category: "media", url: "https://artjakarta.com", src: "cropped_logos/brand_03_artjakarta.png", w: 85, h: 17 },
  { id: "bazaar", name: "Bazaar", category: "media", url: "https://www.harpersbazaar.co.id", src: "cropped_logos/brand_08_bazaar.png", w: 69, h: 19 },
  { id: "cosmopolitan", name: "Cosmopolitan", category: "media", url: "https://www.cosmopolitan.co.id", src: "cropped_logos/brand_09_cosmopolitan.png", w: 96, h: 18 },
  { id: "herworld", name: "Her World", category: "media", url: "https://www.herworld.co.id", src: "cropped_logos/brand_10_herworld.png", w: 91, h: 21 },
  { id: "motherandbeyond", name: "Mother & Beyond", category: "media", url: "https://www.motherandbeyond.co.id", src: "cropped_logos/brand_11_motherandbeyond.png", w: 51, h: 27 },
  { id: "casa", name: "CASA", category: "media", url: "https://www.casaindonesia.com", src: "cropped_logos/brand_12_casa.png", w: 40, h: 35 },
  { id: "iswara", name: "iSWARA", category: "media", url: "https://www.mra.co.id", src: "cropped_logos/brand_13_iswara.png", w: 55, h: 29 },
  { id: "trl", name: "TRL", category: "media", url: "https://www.mra.co.id", src: "cropped_logos/brand_14_trl.png", w: 41, h: 28 },
  { id: "parentalk", name: "Parentalk", category: "media", url: "https://parentalk.id", src: "cropped_logos/brand_15_parentalk.png", w: 76, h: 21 },
  { id: "mramu", name: "MRAmu", category: "media", url: "https://mramu.com/", src: "cropped_logos/brand_17_mramu.png", w: 84, h: 22 }
];

// Current State
let state = {
  template: "corporate_v4_premier",
  name: "Aris Munandar",
  title: "IT Support Specialist",
  email: "aris@mraretail.co.id",
  phone: "6221 2765 1868",
  mobile: "0851 5514 0987",
  address: "Wisma MRA, Jl. TB Simatupang\nNo. 19 Jakarta, 12430, Indonesia",
  website: "www.mra.co.id",
  theme: "gold",
  activeCategory: "all",
  activeBrands: BRANDS_DATABASE.map(b => b.id),
  previewBg: "light"
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderBrandSelector();
  bindFormEvents();
  loadPresets();
  updatePreview();
});

// Category Filter Handler
function setBrandCategory(category) {
  state.activeCategory = category;
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });
  renderBrandSelector();
}

let draggedBrandId = null;

// Select/Deselect All Brands
function selectAllBrands(status) {
  if (status) {
    state.activeBrands = BRANDS_DATABASE.map(b => b.id);
  } else {
    state.activeBrands = [];
  }
  renderBrandSelector();
  updatePreview();
}

// Reset Brand Order to Database Default
function resetBrandOrder() {
  const activeSet = new Set(state.activeBrands);
  state.activeBrands = BRANDS_DATABASE.filter(b => activeSet.has(b.id)).map(b => b.id);
  renderBrandSelector();
  updatePreview();
  showToast("🔄 Brand order reset to default!");
}

// Render Brand Toggle & Reorder Items
function renderBrandSelector() {
  const container = document.getElementById("brand-selector");
  if (!container) return;

  // Order brands based on state.activeBrands sequence, then remaining inactive brands
  const activeBrandObjects = state.activeBrands
    .map(id => BRANDS_DATABASE.find(b => b.id === id))
    .filter(Boolean);

  const inactiveBrandObjects = BRANDS_DATABASE.filter(b => !state.activeBrands.includes(b.id));

  const allOrderedBrands = [...activeBrandObjects, ...inactiveBrandObjects];

  const filtered = state.activeCategory === "all"
    ? allOrderedBrands
    : allOrderedBrands.filter(b => b.category === state.activeCategory);

  container.innerHTML = filtered.map((b, idx) => {
    const isActive = state.activeBrands.includes(b.id);
    const activeIdx = state.activeBrands.indexOf(b.id);
    return `
      <div class="brand-item ${isActive ? 'active' : ''}" 
           data-id="${b.id}" 
           draggable="true"
           ondragstart="handleDragStart(event, '${b.id}')"
           ondragover="handleDragOver(event)"
           ondragleave="handleDragLeave(event)"
           ondrop="handleDrop(event, '${b.id}')"
           ondragend="handleDragEnd(event)">
        <span class="checkbox-dot" onclick="event.stopPropagation(); toggleBrand('${b.id}')"></span>
        <div onclick="toggleBrand('${b.id}')" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
          <img src="${CDN_BASE}${b.src}" alt="${b.name}">
          <span>${b.name}</span>
        </div>
        ${isActive ? `
        <div class="brand-reorder-bar">
          <button class="reorder-btn" onclick="event.stopPropagation(); moveBrand('${b.id}', -1)" title="Move Left / Up"><i class="fa-solid fa-chevron-left"></i></button>
          <span style="font-size: 0.65rem; color: var(--accent-blue); font-weight: 700;">#${activeIdx + 1}</span>
          <button class="reorder-btn" onclick="event.stopPropagation(); moveBrand('${b.id}', 1)" title="Move Right / Down"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

// Move Brand Position (Shift Left or Right)
function moveBrand(id, delta) {
  const idx = state.activeBrands.indexOf(id);
  if (idx === -1) return;

  const targetIdx = idx + delta;
  if (targetIdx < 0 || targetIdx >= state.activeBrands.length) return;

  // Swap positions
  const temp = state.activeBrands[idx];
  state.activeBrands[idx] = state.activeBrands[targetIdx];
  state.activeBrands[targetIdx] = temp;

  renderBrandSelector();
  updatePreview();
}

// HTML5 Drag and Drop Handlers
function handleDragStart(e, id) {
  draggedBrandId = id;
  e.currentTarget.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", id);
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  e.currentTarget.classList.add("drag-over");
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function handleDrop(e, targetId) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");

  if (!draggedBrandId || draggedBrandId === targetId) return;

  const fromIdx = state.activeBrands.indexOf(draggedBrandId);
  const toIdx = state.activeBrands.indexOf(targetId);

  if (fromIdx !== -1 && toIdx !== -1) {
    // Reorder active brands
    state.activeBrands.splice(fromIdx, 1);
    state.activeBrands.splice(toIdx, 0, draggedBrandId);
  } else if (fromIdx === -1 && toIdx !== -1) {
    // Insert new active brand at position
    state.activeBrands.splice(toIdx, 0, draggedBrandId);
  }

  renderBrandSelector();
  updatePreview();
  showToast("✨ Logo repositioned successfully!");
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  document.querySelectorAll(".brand-item").forEach(el => el.classList.remove("drag-over"));
  draggedBrandId = null;
}

// Toggle Brand State
function toggleBrand(id) {
  if (state.activeBrands.includes(id)) {
    state.activeBrands = state.activeBrands.filter(bId => bId !== id);
  } else {
    state.activeBrands.push(id);
  }
  renderBrandSelector();
  updatePreview();
}

// Bind Input Events
function bindFormEvents() {
  const inputs = ["template", "name", "title", "email", "phone", "mobile", "address", "website", "theme"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", (e) => {
        state[id] = e.target.value;
        updatePreview();
      });
    }
  });
}

// Update Preview Canvas & Stats Bar
function updatePreview() {
  const canvas = document.getElementById("signature-preview");
  const statCount = document.getElementById("stat-brand-count");
  const statWidth = document.getElementById("stat-signature-width");

  if (!canvas) return;

  const html = generateSignatureHTML();
  canvas.innerHTML = html;

  if (statCount) statCount.innerText = `${state.activeBrands.length} / ${BRANDS_DATABASE.length}`;
  if (statWidth) statWidth.innerText = (state.template === "corporate_v2_wide" || state.template === "corporate_v4_premier") ? "840px" : "832px";

  // Selected Logo for Click-to-Swap
  let selectedCanvasBrandId = null;

  // Attach Direct Drag and Drop & Click-to-Swap to Preview Canvas Logos
  const previewLogos = canvas.querySelectorAll("td[data-brand-id]");
  previewLogos.forEach(td => {
    const brandId = td.getAttribute("data-brand-id");
    td.setAttribute("draggable", "true");
    td.setAttribute("title", "Click to select & swap, or Drag to reposition logo");

    // Click-to-Swap handler
    td.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!selectedCanvasBrandId) {
        selectedCanvasBrandId = brandId;
        td.classList.add("canvas-selected");
        const bName = BRANDS_DATABASE.find(b => b.id === brandId)?.name || brandId;
        showToast(`📍 Selected ${bName}. Click another logo to swap position!`);
      } else if (selectedCanvasBrandId === brandId) {
        selectedCanvasBrandId = null;
        td.classList.remove("canvas-selected");
      } else {
        const fromIdx = state.activeBrands.indexOf(selectedCanvasBrandId);
        const toIdx = state.activeBrands.indexOf(brandId);
        if (fromIdx !== -1 && toIdx !== -1) {
          const temp = state.activeBrands[fromIdx];
          state.activeBrands[fromIdx] = state.activeBrands[toIdx];
          state.activeBrands[toIdx] = temp;
          selectedCanvasBrandId = null;
          renderBrandSelector();
          updatePreview();
          showToast("✨ Logo positions swapped!");
        }
      }
    });

    // Drag-and-Drop handlers
    td.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      draggedBrandId = brandId;
      td.classList.add("canvas-dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", brandId);
    });

    td.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";
      td.classList.add("canvas-drag-over");
    });

    td.addEventListener("dragleave", (e) => {
      e.stopPropagation();
      td.classList.remove("canvas-drag-over");
    });

    td.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      td.classList.remove("canvas-drag-over");

      if (!draggedBrandId || draggedBrandId === brandId) return;

      const fromIdx = state.activeBrands.indexOf(draggedBrandId);
      const toIdx = state.activeBrands.indexOf(brandId);

      if (fromIdx !== -1 && toIdx !== -1) {
        state.activeBrands.splice(fromIdx, 1);
        state.activeBrands.splice(toIdx, 0, draggedBrandId);
        renderBrandSelector();
        updatePreview();
        showToast("✨ Logo repositioned directly on signature canvas!");
      }
    });

    td.addEventListener("dragend", (e) => {
      e.stopPropagation();
      td.classList.remove("canvas-dragging");
      previewLogos.forEach(el => el.classList.remove("canvas-drag-over"));
      draggedBrandId = null;
    });
  });
}

// Generate Signature HTML based on Template & State
function generateSignatureHTML() {
  const { template, name, title, email, phone, mobile, address, website, theme, activeBrands } = state;
  const isGold = theme === "gold";

  const iconPin = isGold ? "icon_pin_gold.png" : "icon_pin.png";
  const iconPhone = isGold ? "icon_phone_gold.png" : "icon_phone.png";
  const iconGlobe = isGold ? "icon_globe_gold.png" : "icon_globe.png";
  const iconLock = isGold ? "icon_padlock_gold.png" : "icon_padlock.png";
  const dividerColor = isGold ? "#c89b3a" : "#000000";
  const headerNoticeColor = isGold ? "#c89b3a" : "#333333";

  // Filter Active Brands preserving database order
  const selectedBrands = BRANDS_DATABASE.filter(b => activeBrands.includes(b.id));
  
  // Format Address lines
  const formattedAddress = address.replace(/\n/g, "<br />");

  if (template === "corporate_v4_premier") {
    // Premier Modern Card Layout
    const row1Brands = selectedBrands.slice(0, Math.ceil(selectedBrands.length / 2));
    const row2Brands = selectedBrands.slice(Math.ceil(selectedBrands.length / 2));

    const renderBrandRow = (brands) => brands.map(b => `
      <td align="center" valign="middle" style="padding: 0 4px;" data-brand-id="${b.id}">
        <a href="${b.url}" target="_blank" style="border: 0; text-decoration: none;">
          <img src="${CDN_BASE}${b.src}" width="${b.w}" height="${b.h}" alt="${b.name}" style="display: block; width: ${b.w}px; height: ${b.h}px; border: 0;" />
        </a>
      </td>
    `).join("");

    return `
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; width: 840px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
        <tr>
          <td style="padding: 24px;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
              <tr>
                <td valign="top" style="width: 280px; padding-right: 20px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
                    <tr>
                      <td valign="top" style="padding-bottom: 14px;">
                        <img src="${CDN_BASE}mra_logo.png" width="130" height="56" alt="MRA Group" style="display: block; width: 130px; height: 56px; border: 0;" />
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" style="border-left: 3px solid ${dividerColor}; padding-left: 12px;">
                        <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: bold; color: #0f172a; line-height: 18px; letter-spacing: -0.01em;">${name}</div>
                        <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; font-weight: 600; color: ${dividerColor}; line-height: 15px; margin-top: 2px;">${title}</div>
                        <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; color: #64748b; line-height: 14px;">MRA Group</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="middle" style="width: 1px; border-left: 1px solid #e2e8f0; padding: 0;"></td>
                <td valign="top" style="padding-left: 24px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
                    <tr>
                      <td valign="top" style="width: 20px; padding-bottom: 8px;">
                        <img src="${CDN_BASE}${iconPin}" width="18" height="18" alt="Loc" style="display: block; width: 18px; height: 18px; border: 0;" />
                      </td>
                      <td valign="top" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 14px; color: #334155; padding-bottom: 8px;">
                        ${formattedAddress}
                      </td>
                    </tr>
                    <tr>
                      <td valign="middle" style="width: 20px; padding-bottom: 6px;">
                        <img src="${CDN_BASE}${iconPhone}" width="18" height="18" alt="Tel" style="display: block; width: 18px; height: 18px; border: 0;" />
                      </td>
                      <td valign="middle" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 14px; color: #0f172a; padding-bottom: 6px;">
                        <strong>Office:</strong> ${phone} ${mobile ? `&nbsp;|&nbsp; <strong>Mobile:</strong> ${mobile}` : ''}
                      </td>
                    </tr>
                    <tr>
                      <td valign="middle" style="width: 20px;">
                        <img src="${CDN_BASE}${iconGlobe}" width="18" height="18" alt="Web" style="display: block; width: 18px; height: 18px; border: 0;" />
                      </td>
                      <td valign="middle" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 14px; color: #0f172a;">
                        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a> &nbsp;|&nbsp; <a href="https://${website}" target="_blank" style="color: ${dividerColor}; text-decoration: none; font-weight: bold;">${website}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%; margin-top: 18px; margin-bottom: 18px;">
              <tr>
                <td style="border-top: 1px solid #e2e8f0; font-size: 0; line-height: 0;">&nbsp;</td>
              </tr>
            </table>
            <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${dividerColor}; margin-bottom: 12px;">MRA Group Brands & Subsidiaries</div>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="padding: 0;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
                    <tr>${renderBrandRow(row1Brands)}</tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="12" style="font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
              </tr>
              <tr>
                <td style="padding: 0;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
                    <tr>${renderBrandRow(row2Brands)}</tr>
                  </table>
                </td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%; margin-top: 18px; border-top: 1px solid #e2e8f0;">
              <tr>
                <td valign="top" style="width: 36px; padding-top: 12px; padding-right: 12px;">
                  <img src="${CDN_BASE}${iconLock}" width="32" height="32" alt="Lock" style="display: block; width: 32px; height: 32px; border: 0;" />
                </td>
                <td valign="top" style="padding-top: 12px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 9px; line-height: 12px; color: #64748b; text-align: left;">
                  <span style="font-weight: bold; color: ${headerNoticeColor};">CONFIDENTIALITY NOTICE*</span> — This e-mail and any attachments are confidential and intended solely for the addressee(s). If you are not the intended recipient, please notify the sender immediately, delete this e-mail and all copies, and do not use, disclose, copy or distribute its contents.
                  <br /><br />
                  This e-mail does not constitute a legally binding agreement or commitment on behalf of MRA Group, its subsidiaries or affiliates unless expressly confirmed in writing by a duly authorized representative.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;
  }

  if (template === "corporate_v2_wide") {
    // Wide Layout (2 Column)
    const row1Brands = selectedBrands.slice(0, Math.ceil(selectedBrands.length / 2));
    const row2Brands = selectedBrands.slice(Math.ceil(selectedBrands.length / 2));

    const renderBrandRow = (brands) => brands.map(b => `
      <td align="center" valign="middle" style="padding: 0 4px;" data-brand-id="${b.id}">
        <a href="${b.url}" target="_blank" style="border: 0; text-decoration: none;">
          <img src="${CDN_BASE}${b.src}" width="${b.w}" height="${b.h}" alt="${b.name}" style="display: block; width: ${b.w}px; height: ${b.h}px; border: 0;" />
        </a>
      </td>
    `).join("");

    return `
      <!-- Main Signature Table Container -->
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; width: 840px; background-color: transparent;">
        <tr>
          <!-- Column 1: MRA Group Logo & Contact Details (Left Block) -->
          <td valign="top" style="width: 220px; padding-right: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
              <tr>
                <td valign="top" style="padding-left: 10px; padding-bottom: 20px;">
                  <img src="${CDN_BASE}mra_logo.png" width="125" height="54" alt="MRA Group" style="display: block; width: 125px; height: 54px; border: 0;" />
                </td>
              </tr>
              <tr>
                <td valign="top" style="padding-left: 10px; padding-bottom: 8px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                    <tr>
                      <td valign="top" style="width: 18px; padding-right: 10px; padding-top: 1px;">
                        <img src="${CDN_BASE}${iconPin}" width="18" height="18" alt="Loc" style="display: block; width: 18px; height: 18px; border: 0;" />
                      </td>
                      <td valign="top" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 13px; color: #000000; white-space: nowrap;">
                        ${formattedAddress}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td valign="top" style="padding-left: 10px; padding-bottom: 8px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                    <tr>
                      <td valign="middle" style="width: 18px; padding-right: 10px;">
                        <img src="${CDN_BASE}${iconPhone}" width="18" height="18" alt="Tel" style="display: block; width: 18px; height: 18px; border: 0;" />
                      </td>
                      <td valign="middle" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 13px; color: #000000; font-weight: bold; white-space: nowrap;">
                        ${phone}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td valign="top" style="padding-left: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                    <tr>
                      <td valign="middle" style="width: 18px; padding-right: 10px;">
                        <img src="${CDN_BASE}${iconGlobe}" width="18" height="18" alt="Web" style="display: block; width: 18px; height: 18px; border: 0;" />
                      </td>
                      <td valign="middle" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 13px; color: #000000; font-weight: bold; white-space: nowrap;">
                        <a href="https://${website}" target="_blank" style="color: #000000; text-decoration: none;">${website}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>

          <!-- Divider -->
          <td valign="middle" style="width: 1px; border-left: 1px solid ${dividerColor}; padding: 0;"></td>

          <!-- Column 2: Brand Logos Grid -->
          <td valign="middle" style="width: 580px; padding-left: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 580px;">
              <tr>
                <td style="padding: 0;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 580px;">
                    <tr>${renderBrandRow(row1Brands)}</tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="15" style="font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
              </tr>
              <tr>
                <td style="padding: 0;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 580px;">
                    <tr>${renderBrandRow(row2Brands)}</tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Disclaimer Section -->
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 840px; margin-top: 15px; border-top: 1px solid #c5c5c5;">
        <tr>
          <td valign="top" style="width: 36px; padding-top: 12px; padding-right: 12px;">
            <img src="${CDN_BASE}${iconLock}" width="36" height="36" alt="Lock" style="display: block; width: 36px; height: 36px; border: 0;" />
          </td>
          <td valign="top" style="padding-top: 12px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 9px; line-height: 12px; color: #666666; text-align: left;">
            <span style="font-weight: bold; color: ${headerNoticeColor};">CONFIDENTIALITY NOTICE*</span> — This e-mail and any attachments are confidential and intended solely for the addressee(s). If you are not the intended recipient, please notify the sender immediately, delete this e-mail and all copies, and do not use, disclose, copy or distribute its contents.
            <br /><br />
            This e-mail does not constitute a legally binding agreement or commitment on behalf of MRA Group, its subsidiaries or affiliates unless expressly confirmed in writing by a duly authorized representative. Electronic communications are susceptible to alteration or unauthorized access, and MRA Group accepts no liability for any message that has been altered, corrupted or falsified.
          </td>
        </tr>
      </table>
    `;
  }

  // Default 3-Column Layout (Corporate V1 / V2 / V3)
  const row1Brands = selectedBrands.slice(0, Math.ceil(selectedBrands.length / 2));
  const row2Brands = selectedBrands.slice(Math.ceil(selectedBrands.length / 2));

  const render3ColBrandRow = (brands) => brands.map(b => `
    <td align="center" valign="middle" style="padding: 0 2px;" data-brand-id="${b.id}">
      <a href="${b.url}" target="_blank" style="border: 0; text-decoration: none;">
        <img src="${CDN_BASE}${b.src}" width="${b.w}" height="${b.h}" alt="${b.name}" style="display: block; width: ${b.w}px; height: ${b.h}px; border: 0;" />
      </a>
    </td>
  `).join("");

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; width: 832px; background-color: transparent;">
      <tr>
        <!-- Column 1: MRA Group Logo -->
        <td valign="middle" style="width: 100px; padding-right: 15px;">
          <img src="${CDN_BASE}mra_logo.png" width="100" height="43" alt="MRA Group" style="display: block; width: 100px; height: 43px; border: 0;" />
        </td>

        <!-- Divider 1 -->
        <td valign="middle" style="width: 1px; border-left: 1px solid #000000; padding: 0;"></td>

        <!-- Column 2: Brand Logos Grid -->
        <td valign="middle" style="width: 450px; padding-left: 15px; padding-right: 15px;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 450px;">
            <tr>
              <td style="padding: 0;">
                <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 450px;">
                  <tr>${render3ColBrandRow(row1Brands)}</tr>
                </table>
              </td>
            </tr>
            <tr>
              <td height="12" style="font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 0;">
                <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 450px;">
                  <tr>${render3ColBrandRow(row2Brands)}</tr>
                </table>
              </td>
            </tr>
          </table>
        </td>

        <!-- Divider 2 -->
        <td valign="middle" style="width: 1px; border-left: 1px solid #000000; padding: 0;"></td>

        <!-- Column 3: Contact Info -->
        <td valign="middle" style="width: 220px; padding-left: 15px;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
            ${template === "corporate_v3" ? `
            <tr>
              <td colspan="2" style="padding-bottom: 6px;">
                <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; color: #000000;">${name}</div>
                <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; color: #666666;">${title}</div>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td valign="top" style="width: 15px; padding-right: 8px; padding-top: 1px;">
                <img src="${CDN_BASE}icon_pin.png" width="13" height="17" alt="Loc" style="display: block; width: 13px; height: 17px; border: 0;" />
              </td>
              <td valign="top" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 13px; color: #000000; white-space: nowrap;">
                ${formattedAddress}
              </td>
            </tr>
            <tr>
              <td valign="middle" style="width: 15px; padding-right: 8px; padding-top: 6px; padding-bottom: 6px;">
                <img src="${CDN_BASE}icon_phone.png" width="15" height="16" alt="Tel" style="display: block; width: 15px; height: 16px; border: 0;" />
              </td>
              <td valign="middle" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 13px; color: #000000; font-weight: bold; padding-top: 6px; padding-bottom: 6px; white-space: nowrap;">
                ${phone}
              </td>
            </tr>
            <tr>
              <td valign="middle" style="width: 15px; padding-right: 8px;">
                <img src="${CDN_BASE}icon_globe.png" width="16" height="15" alt="Web" style="display: block; width: 16px; height: 15px; border: 0;" />
              </td>
              <td valign="middle" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 13px; color: #000000; font-weight: bold; white-space: nowrap;">
                <a href="https://${website}" target="_blank" style="color: #000000; text-decoration: none;">${website}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Disclaimer Section -->
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 832px; margin-top: 15px; border-top: 1px solid #c5c5c5;">
      <tr>
        <td valign="top" style="width: 14px; padding-top: 12px; padding-right: 12px;">
          <img src="${CDN_BASE}icon_padlock.png" width="14" height="20" alt="Lock" style="display: block; width: 14px; height: 20px; border: 0;" />
        </td>
        <td valign="top" style="padding-top: 12px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 9px; line-height: 12px; color: #666666; text-align: left;">
          <span style="font-weight: bold; color: #333333;">CONFIDENTIALITY NOTICE*</span> — This e-mail and any attachments are confidential and intended solely for the addressee(s). If you are not the intended recipient, please notify the sender immediately, delete this e-mail and all copies, and do not use, disclose, copy or distribute its contents.
          <br /><br />
          This e-mail does not constitute a legally binding agreement or commitment on behalf of MRA Group, its subsidiaries or affiliates unless expressly confirmed in writing by a duly authorized representative. Electronic communications are susceptible to alteration or unauthorized access, and MRA Group accepts no liability for any message that has been altered, corrupted or falsified.
        </td>
      </tr>
    </table>
  `;
}

// Toggle Dark Mode Preview Canvas
function togglePreviewBg(mode) {
  state.previewBg = mode;
  const wrapper = document.getElementById("canvas-wrapper");
  const lightBtn = document.getElementById("btn-preview-light");
  const darkBtn = document.getElementById("btn-preview-dark");

  if (mode === "dark") {
    wrapper.classList.add("dark-mode");
    darkBtn.classList.add("active");
    lightBtn.classList.remove("active");
  } else {
    wrapper.classList.remove("dark-mode");
    lightBtn.classList.add("active");
    darkBtn.classList.remove("active");
  }
}

// Copy Formatted Signature (Rich Text for Outlook)
async function copyRichText() {
  const preview = document.getElementById("signature-preview");
  if (!preview) return;

  try {
    const range = document.createRange();
    range.selectNode(preview);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy");
    selection.removeAllRanges();

    showToast("✨ Rich-Text Signature Copied! Ready to paste in Outlook.");
  } catch (err) {
    showToast("⚠ Unable to copy automatically. Please select preview & copy manually.");
  }
}

// Copy Raw HTML Code
function copyHTMLCode() {
  const html = generateSignatureHTML();
  navigator.clipboard.writeText(html).then(() => {
    showToast("✨ HTML Source Code copied to clipboard!");
  }).catch(() => {
    showToast("⚠ Failed to copy HTML code.");
  });
}

// Download .htm File
function downloadHTM() {
  const html = generateSignatureHTML();
  const fullDocument = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>MRA Email Signature</title>\n</head>\n<body style="margin: 0; padding: 0;">\n${html}\n</body>\n</html>`;
  
  const blob = new Blob([fullDocument], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mra_signature_${state.template}.htm`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("⚡ Downloaded mra_signature_" + state.template + ".htm");
}

// Preset Management
function savePreset() {
  const presetName = prompt("Enter a title for this signature preset:", state.name || "Default Signature");
  if (!presetName) return;

  const presets = JSON.parse(localStorage.getItem("mra_signature_presets") || "[]");
  const newPreset = { id: Date.now(), title: presetName, data: { ...state } };
  presets.push(newPreset);

  localStorage.setItem("mra_signature_presets", JSON.stringify(presets));
  loadPresets();
  showToast("✨ Signature preset saved!");
}

function loadPresets() {
  const presets = JSON.parse(localStorage.getItem("mra_signature_presets") || "[]");
  const container = document.getElementById("preset-list");
  if (!container) return;

  if (presets.length === 0) {
    container.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-muted);">No saved presets yet.</p>`;
    return;
  }

  container.innerHTML = presets.map(p => `
    <div class="preset-card">
      <div class="preset-info">
        <h4>${p.title}</h4>
        <p>${p.data.template} • ${p.data.email || 'No email'}</p>
      </div>
      <div class="preset-actions">
        <button class="btn-icon" onclick="applyPreset(${p.id})"><i class="fa-solid fa-check"></i> Load</button>
        <button class="btn-icon delete" onclick="deletePreset(${p.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

function applyPreset(id) {
  const presets = JSON.parse(localStorage.getItem("mra_signature_presets") || "[]");
  const preset = presets.find(p => p.id === id);
  if (!preset) return;

  state = { ...preset.data };
  
  // Update Form Inputs
  const fields = ["template", "name", "title", "email", "phone", "mobile", "address", "website", "theme"];
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el) el.value = state[f];
  });

  renderBrandSelector();
  updatePreview();
  showToast(`✨ Loaded preset: ${preset.title}`);
}

function deletePreset(id) {
  let presets = JSON.parse(localStorage.getItem("mra_signature_presets") || "[]");
  presets = presets.filter(p => p.id !== id);
  localStorage.setItem("mra_signature_presets", JSON.stringify(presets));
  loadPresets();
  showToast("Preset deleted.");
}

// Toast System
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
