import { TickManager } from "ts-ticker";
import * as PIXI from "pixi.js";
import "gsap";
import * as $ from "jquery";

export class Main {

    private tickManager: TickManager;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private stage: PIXI.Container;

    constructor() {
        $(document).ready(this.init.bind(this));
    }



    private init(): void {
        //create render
        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(1024, 786);
        document.body.appendChild(this.renderer.view);


        //loade example sprite
        var loader = new PIXI.loaders.Loader();
        loader.add('running_bot', "asset/running_bot.json");
        loader.once('complete', this.handleAssetsLoaded, this);
        loader.load();

        //setup ticker manager
        this.tickManager = new TickManager();
        this.tickManager.onUpdate.add(this.update, this);

    }

    private handleAssetsLoaded(): void {
        var frames = [];
        for (var i = 0; i < 10; i++) {
            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.fromFrame(i.toString()));
        }

        // create a MovieClip (brings back memories from the days of Flash, right ?)
        var movie = new PIXI.extras.MovieClip(frames);
        movie.y = 50;
        movie.x = 50;
        movie.anchor.set(0.5);
        movie.animationSpeed = 0.25;
        movie.scale.x = -1;
        movie.play();

        this.stage.addChild(movie);

        //TWEEN


        var tween: TimelineLite = new TimelineLite();
        tween.to(movie, 6, { x: 1024 - 50, y: 50, ease: Power0.easeNone });
        tween.to(movie, 6, { x: 1024 - 50, y: 768 - 50, ease: Power0.easeNone });
        tween.to(movie, 6, { x: 50, y: 768 - 50, ease: Power0.easeNone });
        tween.to(movie, 6, { x: 50, y: 50, ease: Power0.easeNone });
    }

    private update(elapsed: number): void {
        this.renderer.render(this.stage);

        //createjs.Tween.tick(elapsed, false);
        console.log(elapsed);
    }
}
new Main();