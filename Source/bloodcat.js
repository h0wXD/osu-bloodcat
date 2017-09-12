// The MIT License (MIT)
//
// Copyright (c) 2015 h0wXD. https://github.com/h0wXD
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var userLoggedOutReplace = function() {
  var loggedOut = document.getElementsByClassName('login-open-button');

  if (loggedOut.length > 0)
  {
    var regex = /https?:\/\/osu.ppy.sh\/s\/(\d{1,8})/ig;
    var match = regex.exec(window.location.href);
    var parent = document.querySelector('.content-with-bg div.paddingboth');
    var element = null;
    
    if (!match)
    {
      regex = /\/\/b.ppy.sh\/thumb\/(\d{1,8}).*/ig;
      var elements = document.getElementsByTagName('img');
      
      for (var i = 0; i < elements.length; i++)
      {
        match = regex.exec(elements[i].src);
        
        if (!!match)
        {
          break;
        }
      }
    }

    if (!!match) {
      var buttons = Object.assign(document.createElement('div'), {
        className: 'beatmapDownloadButton'
      });
      buttons.innerHTML = '<a class="beatmap_download_link" href="http://bloodcat.com/osu/s/' + match[1] + '"><img src="//s.ppy.sh/images/osu-download-beatmap.png"></a></div>';
      parent.insertBefore(buttons, parent.firstChild);
    }
  }
}

var userLoggedInReplace = function() {
  var elements = document.getElementsByClassName('beatmap_download_link');
  
  for (var i = 0; i < elements.length; i++)
  {
    var regex = /https?:\/\/osu.ppy.sh\/d\/([0-9n]{1,8})/ig;
    var element = elements[i];
    var match = regex.exec(element.href);
    
    if (match != null)
    {
      element.href = 'http://bloodcat.com/osu/s/' + match[1].replace(/n/g, '');
    }
    else
    {
      if (element.href.length > 0 &&
        element.href[element.href.length - 1] === '#')
      {
        var newElement = element.cloneNode(true);
        newElement.className = element.className.replace(/(\s|^)require-login(\s|$)/, '');
        newElement.href = 'http://bloodcat.com/osu/s/' + element.parentNode.parentNode.id;
        
        element.parentNode.replaceChild(newElement, element);
      }
    }
  }
}

userLoggedOutReplace();
userLoggedInReplace();

function doReplace(elements) {
  for (var i = 0; i < elements.length; i++)
  {
    var regex = /https?:\/\/osu.ppy.sh\/beatmapsets\/([0-9n]{1,8})\/download/ig;
    var element = elements[i];
    var match = regex.exec(element.href);

    if (match != null)
    {
      element.href = 'http://bloodcat.com/osu/s/' + match[1].replace(/n/g, '');
    }
  }
}

function doAppend(elements) {
  for (var i = 0; i < elements.length; i++)
  {
    var element = elements[i].getElementsByClassName('beatmapset-panel__thumb')[0];
    var regex = /https?:\/\/osu.ppy.sh\/beatmapsets\/([0-9n]{1,8})/ig;
    var match = regex.exec(element.href);

    if (match != null)
    {
      var box = elements[i].getElementsByClassName('beatmapset-panel__icons-box')[0];
      box.innerHTML = '<a href="http://bloodcat.com/osu/s/' + match[1].replace(/n/g, '') + '" class="beatmapset-panel__icon js-beatmapset-download-link" data-turbolinks="false"><span class="fa fa-download"></span></a>';
    }
  }
}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node){
      var target = node.getElementsByClassName('js-beatmapset-download-link');
      target.length ? doReplace(target) : doAppend(node.getElementsByClassName('beatmapset-panel__panel'));
    });
  });
});

var bootstrap = new MutationObserver(function(mutations) {
  var target = document.getElementsByClassName('beatmapsets__items')[0];
  if (target)
  {
    bootstrap.disconnect();
    var as = document.getElementsByClassName('js-beatmapset-download-link');
    as.length ? doReplace(as) : doAppend(document.getElementsByClassName('beatmapset-panel__panel'));
    observer.observe(target, { childList: true });
  }
});

var songObserver = new MutationObserver(function(mutations) {
  var target = document.getElementsByClassName('beatmapset-header__box--main')[0];
  if (target)
  {
    songObserver.disconnect();
    var as = document.getElementsByClassName('js-beatmapset-download-link');
    if (as.length)
    {
      doReplace(as);
    }
    else
    {
      var buttons = Object.assign(document.createElement('div'), {
        className: 'beatmapset-header__buttons'
      });
      buttons.innerHTML = '<a href="http://bloodcat.com/osu/s/' + match[1].replace(/n/g, '') + '" data-turbolinks="false" class="btn-osu-big btn-osu-big--beatmapset-header js-beatmapset-download-link"><span class="btn-osu-big__content undefined"><span class="btn-osu-big__left"><span class="btn-osu-big__text-top">Download</span></span><span class="btn-osu-big__icon"><span class="fa fa-download"></span></span></span></a>';
      target.appendChild(buttons);
    }
  }
});

if (window.location.pathname == '/beatmapsets')
{
  bootstrap.observe(document.body, { childList: true, subtree: true });
}
else
{
  var regex = /\/beatmapsets\/([0-9n]{1,8})/ig;
  var match = regex.exec(window.location.pathname);
  if (match != null)
  {
    songObserver.observe(document.body, { childList: true, subtree: true });
  }
}
