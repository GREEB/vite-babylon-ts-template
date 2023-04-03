import "./style.css"
import "@babylonjs/core/Debug/debugLayer"
import "@babylonjs/inspector"
import {
    Engine,
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
} from "@babylonjs/core"

const CANVAS_ID = 'scene'

class App {
    constructor() {
        let canvas:any = document.querySelector(`canvas#${CANVAS_ID}`)!
        // initialize babylon scene and engine
        let engine = new Engine(canvas, true)
        let scene = new Scene(engine)

        let camera = new ArcRotateCamera(
            "Camera",
            Math.PI / 2,
            Math.PI / 2,
            2,
            Vector3.Zero(),
            scene
        )
        camera.attachControl(canvas, true)

        new HemisphericLight("light1", new Vector3(1, 1, 0), scene)
        MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene)

        // hide/show the Inspector
        window.addEventListener("keydown", ev => {
            if (ev.key === "i") {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide()
                } else {
                    scene.debugLayer.show()
                }
            }
        })

        engine.runRenderLoop(() => {
            scene.render()
        })
    }
}

new App()
