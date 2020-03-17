export class audioPlayer {
	constructor(){
		this.audioPlayer = document.querySelector('.audioPlayer');
		this.renderAudioPlayer();
		this.volume = document.querySelector('.inpAudioVolume');
		this.btnAudio = document.querySelector('.btnAudio');
		this.audioVolume = document.querySelector('.audioVolume');
		this.audioTrack = new Audio('./media/Neil Young.mp3');

		this.btnAudio.addEventListener('click', this.clickAudio.bind(this));
		this.volume.addEventListener('change', this.changeVolume.bind(this));
	}
	renderAudioPlayer(){
		this.audioPlayer.innerHTML = `<p>audio control</p>
									  <div class="audioControl d-flex">
										  <div class="audioVolume">
											<input type="range" class="inpAudioVolume" min="0" max="100" value="30" step="5"> 
										  </div>
										  <div class="btnAudio btnAudio-pause"></div>
									  </div>`
	}
	startAudio(){
		this.audioTrack.autoplay = true;
		this.audioTrack.loop = true;
		this.audioTrack.volume = this.volume.value / 100;
		this.audioTrack.play();
	}
	clickAudio(){
		if(this.btnAudio.classList.contains('btnAudio-play')){
			this.audioTrack.play();
		}
		else this.audioTrack.pause();
		this.btnAudio.classList.toggle('btnAudio-pause');
		this.btnAudio.classList.toggle('btnAudio-play');
	}
	changeVolume(){
		this.audioTrack.volume = this.volume.value / 100;
	}

}