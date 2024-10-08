const SIZES = [
    "42GB",
    "60GB",
    "120GB",
    "250GB",
    "500GB",
    "1TB"
  ];
  
  const DISKS = [
    "WDC WD1603821JS-84WAA8",
    "SAMSUNG SP2504C VT100-33",
    "ExcelStor Technology J880 PF20A21B",
    "ExcelStor Technology J9250S GM20A52A",
    "WDC WD3200AAJS-00RYA0 12.01B",
    "ST9500325AS 0002SDM1",
    "MAXTOR 6Y060M0 SN0874",
    "WDC WD800JB-00FMA0"
  ];
  
  const DEVICES = [
    `HL-DT-ST GCE-8526B 1.04`,
    `HL-DT-ST DVDRAM GSA-H10A JL02`,
    "OPTIARC DVD RW AD-7173A 1-01",
    "SLIMTYPE DVD A DS8A3S HA28",
    "HL-DT-ST DVDRAM GH22LS50 TL02",
    "TSSTCORP CDDVDW SH-S202G SB00",
    "LITE-ON DVD SOHD-16P9S FS09"
  ];
  
  const EVENTS = [
    "CMOS checksum error - Defaults loaded",
    "Floppy disk(s) fail (40)",
    "Keyboard error or no keyboard present",
    "<strong>Trend ChipAwayVirus(R) On Guard</strong>",
    "CMOS battery failed",
    "Primary IDE channel no 80 conductor cable installed",
    "Boot Disk failure. Type key to retry",
    "Non-System Disk or disk error<br>Replace and press any key when ready",
    "Conflict I/O Ports: 2E8 2EB",
    "Warning! CPU has been changed",
    "BIOS Guardian(R) enabled. You will need to disable BIOS Guardian to update BIOS",
    "OC fail, please enter setup to change OC Fail settings",
    "AHCI Port0 Device Error",
    "Press F2 to Resume"
  ];
  
  const keySound = new Audio("https://leandromeda.neocities.org/audio/key.mp3");
  
  const type = (paragraph, text) => {
    const duration = Number(paragraph.dataset.duration) || 5000;
    const portions = ~~(duration / text.length);
    for (let i = 0; i <= text.length; i++) {
      setTimeout(() => {
        paragraph.textContent = text.substring(0, i);
        keySound.currentTime = 0;
        keySound.play();
      }, i * portions);
    }
  }
  
  const typewriter = (paragraph) => {
    const delay = paragraph.dataset.delay || 0;
    const text = paragraph.textContent;
    paragraph.textContent = "";
    setTimeout(() => type(paragraph, text), delay);
  }
  
  const sound = new Audio("https://leandromeda.neocities.org/audio/boot.mp3");
  
  const date = () => {
    const date = new Date();
    const zeroFill = data => String(data).padStart(2, "0");
  
    const day = zeroFill(date.getDate());
    const month = zeroFill(date.getMonth() + 1);
    const year = date.getFullYear().toString().substring(2, 4);
  
    return `${day}/${month}/${year}`;
  }
  
  class AwardBoot extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    static get styles() {
      return `
        .screen {
          display: block;
          width: var(--width, 1024px);
          height: var(--height, 768px);
          position: relative;
          background: #000;
          padding: 25px;
        }
        .ribbon {
          width: 48px;
          height: 48px;
          image-rendering: pixelated;
        }
        .brand-text {
          display: flex;
          align-items: center;
        }
        .epa {
          position: absolute;
          right: 0;
          top: 0;
          opacity: 1;
          transition: opacity 1s linear;
        }
        .epa.fadeoff {
          opacity: 0;
        }
        strong {
          color: #fff;
          font-weight: normal;
        }
        p.line {
          margin: 0;
        }
        .off {
          visibility: hidden;
        }
        .pre {
          white-space: pre;
        }
        .last {
          position: absolute;
          bottom: 0;
        }
        .hdd {
          margin-bottom: 50px;
        }
      `;
    }
  
    connectedCallback() {
      this.render();
      this.rebootSystem();
    }
  
    setVisible(className, duration = 0) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.shadowRoot.querySelector(className).classList.remove("off");
          resolve(true)
        }, duration);
      });
    }
  
    setHTML(className, HTML, duration = 0) {
      return new Promise(resolve => {
        setTimeout(() => {
          const div = this.shadowRoot.querySelector(className);
          div.innerHTML = HTML;
          resolve(true)
        }, duration);
      });
    }
  
    addHTML(className, HTML) {
      const div = this.shadowRoot.querySelector(className);
      div.innerHTML += HTML;
    }
  
    async detectDevice(place, label) {
      const n = ~~(Math.random() * 4);
  
      if (n === 0) {
        const device = DEVICES[~~(Math.random() * DEVICES.length)];
        await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>[Press <strong>F4</strong> to skip]</span>`);
        await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>${device}</span>`, 4000);
      }
      else if (n === 1) {
        const disk = DISKS[~~(Math.random() * DISKS.length)];
        await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>[Press <strong>F4</strong> to skip]</span>`);
        await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>${disk}</span>`, 4000);
      }
      else {
        await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>None</span>`, 50);
      }
    }
  
    async detectHardDisks() {
  
      const disk = DISKS[~~(Math.random() * DISKS.length)];
      const size = SIZES[~~(Math.random() * SIZES.length)];
  
      await this.setHTML(".hdd p:nth-child(1)", `Detecting IDE Primary Master  ... <span>[Press <strong>F4</strong> to skip]</span>`);
      await this.setHTML(".hdd p:nth-child(1)", `Detecting IDE Primary Master  ... <span>${disk} ${size}</span>`, 2000);
  
      await this.detectDevice(2, "Primary Slave");
      await this.detectDevice(3, "Secondary Master");
      await this.detectDevice(4, "Secondary Slave");
    }
  
    turnOn() {
      return this.setHTML(".header", `
        <img class="epa" src="https://leandromeda.neocities.org/assets/img/epa.png" alt="Energy EPA">
        <div class="brand-text">
          <img class="ribbon" src="https://leandromeda.neocities.org/assets/img/award.png" alt="Award Logo">
            <p>
              Award Modular BIOS v4.50G, An Energy Star Ally<br>
                Copyright (C) 1984-94, Award Software, Inc.
            </p>
          </div>
            <p>M4NZD3V ACPI BIOS Revision 1004</p>
            <p>
              Intel(R) Pentium(R) PRO-MMX CPU at 133Mhz<br>
              Memory Test:  <span class="memory">${2 ** 16}</span>
            </p>
        `, 2000);
    }
  
    enterBIOS() {
      const monitor = document.querySelector(".monitor");
      const bios = document.createElement("award-bios");
      monitor.appendChild(bios);
      this.remove();
    }
  
    async rebootSystem() {
      const timeline = [
        { action: () => this.turnOn() },
        { action: () => this.checkMemory() },
        { action: () => this.setVisible(".pnp-stage", 3000) },
        { action: () => this.detectHardDisks() },
        { action: () => this.createRandomEvent(2000) },
        { action: () => this.setVisible(".last", 3500) },
        { action: () => this.enterBIOS() }
      ];
  
      sound.play();
  
      let i = 0;
      while (i < timeline.length) {
        await timeline[i].action();
        i++;
      }
    }
  
    checkMemory() {
      return new Promise(resolve => {
        const BLOCK = 8;
        const memory = this.shadowRoot.querySelector(".memory");
        const max = Number(memory.textContent);
        memory.textContent = "";
        for (let i = 0; i < max; i = i + BLOCK) {
          setTimeout(() => {
            memory.textContent = `${i}K`;
          }, i / BLOCK);
        }
        setTimeout(() => this.disableEPA(), 5000);
        setTimeout(() => {
          memory.textContent += " OK";
          resolve(true);
        }, max / BLOCK);
      });
    }
  
    createRandomEvent(duration = 0) {
      const eventName = EVENTS[~~(Math.random() * EVENTS.length)];
      this.setHTML(".event", eventName, duration);
    }
  
    disableEPA() {
      this.shadowRoot.querySelector(".epa").classList.add("fadeoff");
    }
  
    render() {
      this.shadowRoot.innerHTML = `
      <style>${AwardBoot.styles}</style>
      <div class="screen">
        <div class="header">
        </div>
        <p class="pnp-stage off">
          Award Plug and Play BIOS Extension v1.0A<br>
          Initialize Plug and Play Cards...<br>
          PNP Init Completed
        </p>
        <div class="hdd">
          <p class="line pre"></p>
          <p class="line pre"></p>
          <p class="line pre"></p>
          <p class="line pre"></p>
        </div>
        <div class="event"></div>
        <p class="last off">
          Press <strong>F1</strong> to continue, <strong>DEL</strong> to enter SETUP<br>
          ${date()}-i440LX-<strong>LEANDROMEDA</strong>-00
        </p>
      </div>`;
    }
  }
  
  customElements.define("award-boot", AwardBoot);
  
  class AwardBios extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    static get styles() {
      return `
        .screen {
          display: block;
          width: var(--width, 1024px);
          height: var(--height, 768px);
          position: relative;
          padding: 25px;
          color: #ccc;
          position: relative;
          background: #000;
        }
        .blue {
          background: #0000FE;
        }
        .center {
          text-align: center;
        }
        .setup {
          display: grid;
          grid-template-rows: 5.8fr 1fr 1.2fr;
          border: 3px double #fff;
          height: 94%;
        }
        .main-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .options-1 {
          border-right: 1px solid #fff;
        }
        .options {
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-bottom: 125px;
        }
        .main-options span {
          display: block;
          white-space: pre;
          color: #EBFE82;
          padding: 2px 6px;
        }
        .main-options span.selected {
          background: #F31A0A;
          display: inline;
        }
        .shorthands {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 0.1fr);
          align-items: center;
          justify-items: flex-start;
          justify-content: center;
          align-content: center;
          border-top: 3px double #fff;
          padding-left: 16px;
        }
        .copyright {
          border-top: 3px double #fff;
          text-align: center;
        }
        .message {
          background: #F31A0A;
          position: absolute;
          top: 320px;
          left: 350px;
          display: flex;
          align-items: center;
          padding: 8px 3px;
          box-shadow: 12px 18px 0 #000a;
        }
        .container {
          color: #fff;
          border: 1px solid #fff;
          padding: 32px;
        }
        strong {
          color: #fff;
          font-weight: normal;
        }
        .cursor {
          width: 12px;
          display: inline-block;
          border-bottom: 2px solid #c1c1c1;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1 }
          50%, 100% { opacity: 0 }
        }
      `;
    }
  
    connectedCallback() {
      this.render();
      setTimeout(() => this.showExit(), 4000);
    }
  
    showExit() {
      this.shadowRoot.querySelector(".screen").innerHTML += `
      <div class="message">
        <div class="container">SAVE to CMOS and EXIT (Y/N)?</div>
      </div>`;
      setTimeout(() => this.exitBIOS(), 2000);
    }
  
    exitBIOS() {
      const screen = this.shadowRoot.querySelector(".screen");
      screen.classList.remove("blue");
      screen.innerHTML = `<p>C:\\&gt;<span class="typewriter" data-duration="2000" data-delay="0">ROM_1000_GRAU.EXE /LEANDROMEDA EXPLOIT [!]</span><span class="cursor"></span>`;
      typewriter(screen.querySelector(".typewriter"));
      setTimeout(() => {
        screen.innerHTML = `
          <p>
            C:\\&gt;ROM_1000_GRAU.EXE /LEANDROMEDA EXPLOIT [!]<br><br>
            Start booting... <strong>ROM_100_GRAU!</strong><span class="cursor"></span>
          </p>
        `;
      }, 3000);
      setTimeout("location.href = 'https://leandromeda.neocities.org/index-b.html';", 4000);
    }
  
    render() {
      this.shadowRoot.innerHTML = `
      <style>${AwardBios.styles}</style>
      <div class="blue screen">
        <div class="title center">CMOS Setup Utility - Copyright (C) 1984-2001 Award Software</div>
        <div class="setup">
          <div class="main-options">
            <div class="options options-1">
              <span class="selected">► Standard CMOS Setup</span>
              <span>► Advanced Setup</span>
              <span>► Advanced Chipset Setup</span>
              <span>► Integrated Peripherals</span>
              <span>► Power Management Setup</span>
              <span>► PCI/PnP Setup</span>
              <span>► PC Health Status</span>
            </div>
            <div class="options options-2">
              <span>► Frequency/Voltage Control</span>
              <span>  Load Default Settings</span>
              <span>► Supervisor Password</span>
              <span>► User Password</span>
              <span>  Save & Exit Setup</span>
              <span>  Exit Without Saving</span>
            </div>
          </div>
          <div class="shorthands">
            <span>Esc : Quit</span>
            <span>↑↓→← : Select Item</span>
            <span>F10 : Save & Exit Setup</span>
          </div>
          <div class="copyright">
            <p>Change/Set/Disable Password</p>
          </div>
        </div>
      </div>`;
    }
  }
  
  customElements.define("award-bios", AwardBios);