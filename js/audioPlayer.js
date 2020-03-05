export class audioPlayer {
	constructor(){
		this.audioPlayer = document.querySelector('.audioPlayer');
		this.renderAudioPlayer();
		this.btnAudio = document.querySelector('.btnAudio');
		this.audioVolume = document.querySelector('.audioVolume');
		this.audioTtrack = new Audio('./media/Neil Young.mp3');


		this.btnAudio.addEventListener('click', this.clickAudio.bind(this));

	}
	renderAudioPlayer(){
		this.audioPlayer.innerHTML = `<p>audio control</p>
									  <div class="audioControl d-flex">
										  <div class="audioVolume"></div>
										  <div class="btnAudio btnAudio-play"></div>
									  </div>`
	}
	// loadAudio(){
	// 	document.addEventListener('DOMContentLoaded', ()=> {
	// 		console.log('DOM loaded');
	// 		this.audio.autoplay = true;
	// 		this.audio.loop = true;
	// 		this.audioPlayer.appendChild(this.audio);
	//
	// 	});
	// }
	clickAudio(){
		if(this.btnAudio.classList.contains('btnAudio-play')){
			this.audioTtrack.loop = true;
			this.audioTtrack.play();
		}
		else this.audioTtrack.pause();
		this.btnAudio.classList.toggle('btnAudio-pause');
		this.btnAudio.classList.toggle('btnAudio-play');
	}

}