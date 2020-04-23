import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';

@Component({
  tag: 'hc-video',
  styleUrl: 'video.scss',
  shadow: true
})
export class Video {
  @Prop() src: string;
  @Prop() preload: string = 'auto';
  @Prop() autoplay: boolean = false;
  @Prop() play: boolean = false;
  @Prop() network: number;
  @Prop() loaded: number = 0;
  @Prop() poster: string;
  @Prop() duration: number = 0;
  @Prop() current: number = 0;
  @Prop() volume: boolean = true;
  @Element() el:HTMLElement;
  $video;
  timer;
  errormsg = ['用户中止', '网络错误', '解码错误', 'URL无效']
  @Watch('play')
  playHandle (v) {
    var playicon = this.el.shadowRoot.querySelector('#play')
    if (v) {
      this.$video.play()
      playicon.setAttribute('name', 'suspended')
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.current = this.$video.currentTime;
      }, 1000)
    } else {
      this.$video.pause()
      playicon.setAttribute('name', 'play')
      clearInterval(this.timer)
    }
  }
  @Watch('volume')
  volumeHandle (v) {
    var volume = this.el.shadowRoot.querySelector('#volume')
    if (v) {
      volume.setAttribute('name', 'sound-filling')
      this.$video.muted = false
    } else {
      volume.setAttribute('name', 'sound-Mute')
      this.$video.muted = true
    }
  }
  componentDidLoad () {
    this.$video = this.el.shadowRoot.querySelector('video') as HTMLElement;
    if (this.$video.error) {
      this.network = this.$video.error.code
    }
    this.s_to_hs(60)
  }
  bindPlay () {
    this.play = !this.play
  }
  onprogress () {
    this.loaded = Math.round((this.$video.buffered.end(0) / this.duration)*100)
  }
  onloadedmetadata () {
    this.duration = this.$video.duration;
  }
  oncanplay () {
    this.duration = this.$video.duration
  }
  onloadeddata () {
    this.loaded = 100
  }
  s_to_hs(sec){
    var m = Math.floor(sec / 60);
    var s = Math.ceil(sec % 60);
    if (s == 60) {
      m += 1
      s = 0
    }
    var sm = m < 10 ? `0${m}` : `${m}`
    var ss = s < 10 ? `0${s}` : `${s}`
    return `${sm}:${ss}`
  }
  bindVolume () {
    this.volume = !this.volume
  }
  bindfullScreen () {
    this.$video.webkitRequestFullScreen()
  }
  render() {
    return (
      <Host>
        <video 
          onProgress={this.onprogress.bind(this)}
          onLoadedMetaData={this.onloadedmetadata.bind(this)}
          onLoadedData={this.onloadeddata.bind(this)}
          onCanPlay={this.oncanplay.bind(this)}
          poster={this.poster} 
          autoplay={this.autoplay} 
          preload={this.preload} 
          x5-video-player-type="h5-page" 
          src={this.src}
        ></video>
        <div class="control">
          <hc-icon size={28} id="play" onClick={this.bindPlay.bind(this)} name='play'></hc-icon>
          <div class="time">{this.s_to_hs(this.current)}</div>
          <div class="bar">
            <div class="loaded" style={{width: `${this.loaded}%`}}></div>
            <div class="progress" style={{width: `${(this.current / this.duration) * 100}%`}}></div>
          </div>
          <p class="time">
            <span>{this.s_to_hs(this.duration)}</span>
          </p>
          <hc-icon id="volume" onClick={this.bindVolume.bind(this)} name='sound-filling'></hc-icon>
          <hc-icon id="full" name="square" onClick={this.bindfullScreen.bind(this)}></hc-icon>
        </div>
        {/* <div class="error">
        <p>加载进度：{this.loaded}</p>
          <p>{this.errormsg[this.network - 1]}</p>
        </div> */}
        <slot></slot>
      </Host>
    );
  }

}
