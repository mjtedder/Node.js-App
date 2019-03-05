# LIRI Bot

Similar to Apple's SIRI, LIRI (Language Interpretation Recognition Interface) is a CLI application that takes in commands from the user and displays the requested information in the Terminal for Mac users and Command Prompt for Windows users.

| [Node.JS](https://nodejs.org/en/) | [Moment.JS](https://momentjs.com/) | [Axios](https://www.npmjs.com/package/axios) | [Twitter API](https://developer.twitter.com/content/developer-twitter/en.html) | [Spotify API](https://developer.spotify.com/documentation/web-api/)


![Travis](https://img.shields.io/travis/USER/REPO.svg)
![npm](https://img.shields.io/npm/v/npm.svg)
![repo-size](https://img.shields.io/github/repo-size/mjtedder/Node.js-App.svg)


## Installation

To run the application locally, first clone this repository with the following command:

	git clone https://github.com/mjtedder/Node.js-App.git

Next, install the application dependencies:

	* cd your/path/to/Node.js-Appclone
	* yarn install

## Usage

LIRI takes in various commands:

```shell
$ node liri spotify-this-song <songname>
$ node liri get-tweets <tweetsubject>
$ node liri concert-this <bandname>
$ node liri movie-this <movietitle>
```

## Errors and bugs

If something is not behaving intuitively, it is a bug and should be reported.
Report it here by creating an issue: https://github.com/mjtedder/Node.js-App/issues

Help us fix the problem as quickly as possible by following [Mozilla's guidelines for reporting bugs.](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines#General_Outline_of_a_Bug_Report)

## Patches and pull requests

Your patches are welcome! Here's our suggested workflow:

* 🍴 Fork the project.
* Make your feature addition or bug fix.
* Send us a pull request with a description of your work. Bonus points for topic branches!

## Copyright and attribution

Copyright (c) 2018 fully_coded.


git remote add origin https://github.com/mjtedder/Node.js-App.git
git push -u origin master
