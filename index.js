document.addEventListener('DOMContentLoaded', function(){
    // twitch 的資料
    const request = new XMLHttpRequest;
	const limit = 20;
	request.open('GET', 'https:/api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit='+limit, true);
	request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID', 'y845jl7t8ghkmjl9ly8bgfs5sc006i');
    
    // https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit=20&client_id=y845jl7t8ghkmjl9ly8bgfs5sc006i
    
    request.onload = function(){
        for(var i=0; i<JSON.parse(request.responseText).streams.length; i++){
		    if(request.status>=200 && request.status<400){
                const date = JSON.parse(request.responseText).streams[i];
                q('.stream_list').innerHTML += getStream(date);
			}
        }
    }
	request.send();
})
// q
function q(element){
	return document.querySelector(element);
}

// 把資料一一放去欄位
function getStream(date){
	return `
    <div class="stream">
        <a href="${date.channel.url}" target="_blank">
            <div class="stream_preview">
                <img src="${date.preview.large}" alt="preview">
            </div>
            <div class="stream_info">
                <div class="stream_avatar">
                    <img src="${date.channel.logo}" alt="avatar">
                </div>
                <div class="stream_title">
                    <div class="stream_title_name">
                        ${date.channel.status}
                    </div>
                    <div class="stream_title_streamer">
                        ${date.channel.display_name}
                    </div>
                </div>
            </div>
        </a>
    </div>
	`;
}