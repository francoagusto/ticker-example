define(["require", "exports", "ts-ticker", "pixi.js", "jquery", "gsap"], function (require, exports, ts_ticker_1, PIXI, $) {
    "use strict";
    var Main = (function () {
        function Main() {
            $(document).ready(this.init.bind(this));
        }
        Main.prototype.test = function () {
            this.timeout = Date.now();
            setTimeout(this.completeTimer.bind(this), 4000);
        };
        Main.prototype.completeTimer = function () {
            this.timeout = Date.now() - this.timeout;
            console.log("TIMEOUT : " + this.timeout);
        };
        Main.prototype.init = function () {
            this.stage = new PIXI.Container();
            this.renderer = PIXI.autoDetectRenderer(1024, 786);
            document.body.appendChild(this.renderer.view);
            var loader = new PIXI.loaders.Loader();
            loader.add('running_bot', "asset/running_bot.json");
            loader.once('complete', this.handleAssetsLoaded, this);
            loader.load();
            this.tickManager = new ts_ticker_1.TickManager();
            this.tickManager.onUpdate.add(this.update, this);
        };
        Main.prototype.handleAssetsLoaded = function () {
            var frames = [];
            for (var i = 0; i < 10; i++) {
                frames.push(PIXI.Texture.fromFrame(i.toString()));
            }
            var movie = new PIXI.extras.MovieClip(frames);
            movie.y = 50;
            movie.x = 50;
            movie.anchor.set(0.5);
            movie.animationSpeed = 0.25;
            movie.scale.x = -1;
            movie.play();
            this.stage.addChild(movie);
            var tween = new TimelineLite();
            tween.to(movie, 6, { x: 1024 - 50, y: 50, ease: Power0.easeNone });
            tween.to(movie, 6, { x: 1024 - 50, y: 768 - 50, ease: Power0.easeNone });
            tween.to(movie, 6, { x: 50, y: 768 - 50, ease: Power0.easeNone });
            tween.to(movie, 6, { x: 50, y: 50, ease: Power0.easeNone });
        };
        Main.prototype.update = function (elapsed) {
            this.renderer.render(this.stage);
            console.log(elapsed);
        };
        return Main;
    }());
    exports.Main = Main;
    new Main();
});
