// InstagramのクライアントIDと書き換えてください
let client_id = 'YOUR_INSTAGRAM_CLIENT_ID';
let redirec_uri = 'YOUR_REDIRECT_URL';

let authUrl = `https://www.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=public_content`;
let photoUrl = 'https://api.instagram.com/v1/users/self/media/recent/';

ons.ready(function() {
  console.log("Onsen UI is ready!");
  
  $('#auth').on('click', (e) => {
    e.preventDefault();
    let authWindow_loadStartHandler = function(e) {
      // Instagramからaccess_tokenが送られれば成功
      if (m = e.url.match(/#access_token=(.*?)$/)) {
        authWindow.close();
        getPhoto(m[1]);
      }
    };
    let authWindow = window.open(authUrl, '_blank', 'location=no');
    authWindow.addEventListener('loadstart', authWindow_loadStartHandler);
    
  });
  
  let getPhoto = (authKey) => {
    $.ajax({
      url: photoUrl,
      type: 'get',
      dataType: 'json',
      data: {
        access_token: authKey
      }
    })
    .then((results) => {
      let html = [];
      for (let i = 0; i < results.data.length; i++) {
        // 標準画質のURLを使います
        let photo = results.data[i].images.standard_resolution.url;
        html.push(`<ons-card><img src="${photo}" style="width: 100%;" /></ons-card>`);
      }
      $('#photos').html(html.join(''));
    },
    err => {
      console.log(err);
    })
  }
});

