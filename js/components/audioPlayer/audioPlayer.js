export class AudioPlayer {
	constructor(){
		this.audioPlayer = document.querySelector('.audioPlayer');
		this.renderAudioPlayer();
		this.volumeShot = document.querySelector('.inpAudioVolumeShot');
		this.volumeMusic = document.querySelector('.inpAudioVolumeMusic');
		this.btnAudio = document.querySelector('.btnAudio');
		this.audioTracks = {
			music: new Audio('./media/Neil Young.mp3'),
			shot: new Audio('./media/sounds/shot.wav'),
			reload: new Audio('./media/sounds/reload_bullet.wav'),
		}; 
		this.btnAudio.addEventListener('click', this.clickAudio.bind(this));
		this.volumeMusic.addEventListener('change', this.changeVolumeMusic.bind(this));
		this.volumeShot.addEventListener('change', this.changeVolumeShot.bind(this));
		this.startAudioTracks();
	}
	renderAudioPlayer(){
		this.audioPlayer.innerHTML = `<p>audio control</p>
									  <div class="audioVolume">
									    <input type="range" class="inpAudioVolumeShot" min="0" max="100" value="30" step="5"> 
									  </div>
									  <div class="audioControl d-flex">
										  <div class="audioVolume">
											<input type="range" class="inpAudioVolumeMusic" min="0" max="100" value="30" step="5"> 
										  </div>
										  <div class="btnAudio btnAudio-pause"></div>
									  </div>`;
	}
	startAudioTracks(){
		this.audioTracks.music.autoplay = true;
		this.audioTracks.music.loop = true;
		this.audioTracks.music.volume = this.volumeMusic.value / 100;
		this.audioTracks.music.play();
		this.audioTracks.shot.volume = this.volumeShot.value / 100;
	}
	clickAudio(){
		if(this.btnAudio.classList.contains('btnAudio-play')){
			this.audioTracks.music.play();
		}
		else this.audioTracks.music.pause();
		this.btnAudio.classList.toggle('btnAudio-pause');
		this.btnAudio.classList.toggle('btnAudio-play');
	}
	changeVolumeMusic(){
		this.audioTracks.music.volume = this.volumeMusic.value / 100;
	}
	changeVolumeShot(){
		this.audioTracks.shot.volume = this.volumeShot.value / 100;
	}
}