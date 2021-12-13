export function circle(x, y, radius, color, speedX, speedY, action = (obj) => {}) { // Default parameters require ES2015 or newer
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.action = action;
    game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
    game.ctx.arc((typeof this.x === "function") ? this.x() : this.x , (typeof this.y === "function") ? this.y() : this.y, (typeof this.radius === "function") ? radius() : radius, 0, 2*Math.PI);
    game.ctx.fill();
    this.update = () => {
        game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
        game.ctx.beginPath();
        this.action(this);
        game.ctx.arc((typeof this.x === "function") ? this.x() : this.x , (typeof this.y === "function") ? this.y() : this.y, (typeof this.radius === "function") ? radius() : radius, 0, 2*Math.PI);
        game.ctx.fill();
        if (typeof this.x !== "function") this.x += this.speedX;
        if (typeof this.y !== "function") this.y += this.speedY;
    };
}

export function rectangle(x, y, width, height, color, speedX, speedY, action = (obj) => {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.action = action;
    game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
    game.ctx.fillRect((typeof this.x === "function") ? this.x() : this.x, (typeof this.y === "function") ? this.y() : this.y, (typeof this.width === "function") ? this.width() : this.width, (typeof this.height === "function") ? this.height() : this.height);
    this.update = () => {
        game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
        this.action(this);
        game.ctx.fillRect((typeof this.x === "function") ? this.x() : this.x, (typeof this.y === "function") ? this.y() : this.y, (typeof this.width === "function") ? this.width() : this.width, (typeof this.height === "function") ? this.height() : this.height);
        if (typeof this.x !== "function") this.x += this.speedX;
        if (typeof this.y !== "function") this.y += this.speedY;
    }
}

export function centeredText(x, y, text, font, color, speedX, speedY, action = (obj) => {}) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.font = font;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.action = action;
    game.ctx.font = (typeof this.font === "function") ? this.font() : this.font;
    game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
    game.ctx.textAlign = "center";
    game.ctx.fillText((typeof this.text === "function") ? this.text() : this.text, (typeof this.x === "function") ? this.x() : this.x, (typeof this.y === "function") ? this.y() : this.y);
    game.ctx.textAlign = "left";
    this.update = () => {
        game.ctx.font = (typeof this.font === "function") ? this.font() : this.font;
        game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
        game.ctx.textAlign = "center";
        this.action(this);
        game.ctx.fillText((typeof this.text === "function") ? this.text() : this.text, (typeof this.x === "function") ? this.x() : this.x, (typeof this.y === "function") ? this.y() : this.y);
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "middle";
        if (typeof this.x !== "function") this.x += this.speedX;
        if (typeof this.y !== "function") this.y += this.speedY;
    }
}

export function text(x, y, text, font, color, speedX, speedY, action = (obj) => {}) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.font = font;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.action = action;
    game.ctx.font = (typeof this.font === "function") ? this.font() : this.font;
    game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
    game.ctx.fillText((typeof this.text === "function") ? this.text() : this.text, (typeof this.x === "function") ? this.x() : this.x, (typeof this.y === "function") ? this.y() : this.y);
    this.update = () => {
        game.ctx.font = (typeof this.font === "function") ? this.font() : this.font;
        game.ctx.fillStyle = (typeof this.color === "function") ? this.color() : this.color;
        this.action(this);
        game.ctx.fillText((typeof this.text === "function") ? this.text() : this.text, (typeof this.x === "function") ? this.x() : this.x, (typeof this.y === "function") ? this.y() : this.y);
        if (typeof this.x !== "function") this.x += this.speedX;
        if (typeof this.y !== "function") this.y += this.speedY;
    }
}

export const game = ({
    init() {
        const gameArea = document.createElement("canvas");
        gameArea.oncontextmenu = function(e) {e.preventDefault();}
        gameArea.width = window.innerWidth;
        gameArea.height = window.innerHeight;
        this.area = gameArea;
        this.ctx = this.area.getContext("2d");
        this.components = ({});
    },
    addcomponent(name, obj) {
        this.components[name] = (obj);
        obj.name = name;
    },
    deletecomponent(name) {
        this.components[name] = undefined;
    },
    update() {
        this.ctx.clearRect(0, 0, this.area.width, this.area.height);
        for (let component in this.components) {
            if (typeof this.components[component] !== "undefined")
                this.components[component].update();
        }
    },
    play() {
        this.interval = setInterval(() => {
            this.update();
        }, 25);
    },
    stop() {
        clearInterval(this.interval);
    }
});

window.addEventListener("resize", function(e) {
    game.area.width = window.innerWidth;
    game.area.height = window.innerHeight;
})