<template>
  <div ref="container"></div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Geometry,
  Vector3,
  TextureLoader,
  PointsMaterial,
  Points,
  Fog
} from 'three'

@Component({})
export default class SpaceBackground extends Vue {
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  renderer: WebGLRenderer = new WebGLRenderer();
  geo: { geo: Geometry; points: Points }[] = [];

  mounted () {
    this.scene.fog = new Fog(0x000000, 1, 200)
    this.camera.position.z = 1
    this.camera.rotation.x = Math.PI / 2

    this.onResize();

    (this.$refs.container as HTMLElement).appendChild(this.renderer.domElement)

    const count = 2

    const beans: [string, number, number, number][] = [
      ['star.png', 0.5, 4000, 300],
      ['cyan.png', 8, count, 100],
      ['purple.png', 8, count, 100],
      ['brown.png', 8, count, 100],
      ['red.png', 8, count, 100],
      ['black.png', 8, count, 100],
      ['blue.png', 8, count, 100],
      ['green.png', 8, count, 100],
      ['smolred.png', 8, 1, 100]
    ]
    // [texture, size, amount, area]
    this.geo = beans.map((item: [string, number, number, number]) => {
      const starGeo = new Geometry()

      for (let i = 0; i < item[2]; i++) {
        starGeo.vertices.push(
          new Vector3(
            Math.random() * item[3] - item[3] / 2,
            Math.random() * 600 - 300,
            Math.random() * item[3] - item[3] / 2
          )
        )
      }

      const sprite = new TextureLoader().load(item[0])
      const starMaterial = new PointsMaterial({
        color: 0xffffff,
        size: item[1],
        map: sprite,
        transparent: true,
        alphaTest: 0.5
      })

      const stars = new Points(starGeo, starMaterial)
      this.scene.add(stars)

      return {
        geo: starGeo,
        points: stars
      }
    })

    window.addEventListener('resize', this.onResize, false)

    this.animate()
  }

  onResize () {
    const { clientWidth, clientHeight } = this.$refs.container as HTMLElement

    this.camera.aspect = clientWidth / clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(clientWidth, clientHeight)
  }

  animate () {
    this.geo.forEach(({ geo, points }) => { // eslint-disable-line
      geo.vertices.forEach(p => {
        p.y -= 0.35

        if (p.y < -200) {
          p.y = 200
          // p.velocity = 0
        }
      })
      geo.verticesNeedUpdate = true
      points.rotation.y += 0.002
    })

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.animate)
  }
}
</script>
<style scoped lang="stylus">
</style>
