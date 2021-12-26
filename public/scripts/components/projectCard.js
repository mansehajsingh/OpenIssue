class ProjectCard extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this._projectName = "Name";
        this._projectDescription = "Description";
        this.template = document.createElement('template');
    }

    

    connectedCallback() {
        this.render();
    }

    render() {
        
        this.template.innerHTML = /*html*/
        `
        <link href = "/public/stylesheets/style.css" type = "text/css" rel = "stylesheet">
        <div class = "project-card-wrapper">
            <h1 class = "project-name" >${ this._projectName }</h1>
            <p class = "project-description">${ this._projectDescription }</p>
        </div>
        `;

        this.shadow.appendChild(this.template.content.cloneNode(true));
    }

    set projectName(projectName) {
        this._projectName = projectName;
    }

    set projectDescription(projectDescription) {
        this._projectDescription = projectDescription;
    }

}

customElements.define("project-card", ProjectCard);