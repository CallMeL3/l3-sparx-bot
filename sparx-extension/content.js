
const panel = document.createElement("div");

panel.id = "l3-sparx-helper";
panel.innerHTML = `
  <div style="font-weight:bold;margin-bottom:8px;">
    🍌 L3 Sparx Helper
  </div>
  <input
    id="l3-answer"
    type="text"
    placeholder="Enter your checked answer"
    style="width:180px;padding:8px;margin-bottom:8px;"
  >
  <button id="l3-fill" style="padding:8px;cursor:pointer;">
    Fill answer
  </button>
  <div id="l3-status" style="margin-top:8px;font-size:12px;">
    Ready
  </div>
`;

Object.assign(panel.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: "999999",
  background: "#172033",
  color: "white",
  padding: "14px",
  borderRadius: "12px",
  fontFamily: "Arial",
  boxShadow: "0 4px 15px #0008"
});

document.body.appendChild(panel);

document.getElementById("l3-fill").addEventListener("click", () => {
  const answer = document.getElementById("l3-answer").value.trim();
  const status = document.getElementById("l3-status");

  if (!answer) {
    status.textContent = "Enter an answer first.";
    return;
  }

  const fields = [...document.querySelectorAll("input, textarea")]
    .filter(field =>
      field.getClientRects().length &&
      !field.disabled &&
      !field.readOnly
    );

  const field = fields.find(field =>
    !["button", "submit", "checkbox", "radio", "hidden"].includes(field.type)
  );

  if (!field) {
    status.textContent = "I couldn't find an answer box.";
    return;
  }

  const setter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(field),
    "value"
  )?.set;

  if (setter) {
    setter.call(field, answer);
  } else {
    field.value = answer;
  }

  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));

  status.textContent = "Answer filled. Check it before submitting!";
});
