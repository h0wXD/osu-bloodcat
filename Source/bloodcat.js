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

var clickToLoginButton = document.getElementsByClassName('beatmapDownloadButton');

if (clickToLoginButton.length > 0)
{
	var regex = /https?:\/\/osu.ppy.sh\/s\/(\d{1,8})/ig;
	var element = null;
	var match = regex.exec(window.location.href);
	
	if (match != null)
	{
		element = clickToLoginButton[0];
	}
	else
	{
		regex = /\/\/b.ppy.sh\/thumb\/(\d{1,8}).*/ig;
		var elements = document.getElementsByTagName('img');
		
		for (var i = 0; i < elements.length; i++)
		{
			match = regex.exec(elements[i].src);
			
			if (match != null)
			{
				element = clickToLoginButton[0];
				break;
			}
		}
	}
	
	if (element != null)
	{
		element.innerHTML = '<a class="beatmap_download_link" href="http://bloodcat.com/osu/s/' + match[1] + '"><img src="//s.ppy.sh/images/osu-download-beatmap.png"></a>';
	}
}

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
