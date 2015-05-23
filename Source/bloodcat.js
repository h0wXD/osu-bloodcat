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

var elements = document.getElementsByClassName('beatmap_download_link');

for (var i = 0; i < elements.length; i++)
{
	var regex = /https:\/\/osu.ppy.sh\/d\/([0-9n]{1,8})/ig;
	var element = elements[i];
	var match = regex.exec(element.href);
	
	if (match != null)
	{
		//element.href = 'http://bloodcat.com/osu/?q=' + match[1] + '&!b';
		element.href = 'http://bloodcat.com/osu/s/' + match[1].replace(/n/g, '');
	}
}
