export class audioPlayer {
	constructor(){
		this.audioPlayer = document.querySelector('.audioPlayer');
		this.renderAudioPlayer();
		this.btnAudio = document.querySelector('.btnAudio');
		this.audioVolume = document.querySelector('.audioVolume');
		this.audio = new Audio('./media/Neil Young - Dead Man Theme.wav');
		this.btnAudio.addEventListener('click', this.clickAudio.bind(this));
		this.loadAudio();
	}
	renderAudioPlayer(){
		this.audioPlayer.innerHTML = `<p>audio control</p>
									  <div class="audioControl d-flex">
										  <div class="audioVolume"></div>
										  <div class="btnAudio btnAudio-pause"></div>
									  </div>`
	}
	loadAudio(){
		document.addEventListener('DOMContentLoaded', ()=> {
			this.audio.autoplay = true;
			this.audio.loop = true;
			 this.audioPlayer.appendChild(this.audio);

		});
	}
	clickAudio(){

	}

}