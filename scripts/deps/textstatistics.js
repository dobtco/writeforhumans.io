// TextStatistics.js
// Christopher Giffard (2012)
// 1:1 API Fork of TextStatistics.php by Dave Child (Thanks mate!)
// https://github.com/DaveChild/Text-Statistics


(function(glob) {
	var scannedWords = Object;
	function cleanText(text) {
		// all these tags should be preceeded by a full stop.
		var fullStopTags = ['li', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'dd'];
		fullStopTags.forEach(function(tag) {
			text = text.replace("</" + tag + ">",".");
		})

		text = text
			.replace(/<[^>]+>/g, "")				// Strip tags
			.replace(/[,:;()\-]/, " ")				// Replace commans, hyphens etc (count them as spaces)
			.replace(/[\.!?]/, ".")					// Unify terminators
			.replace(/^\s+/,"")						// Strip leading whitespace
			.replace(/[ ]*(\n|\r\n|\r)[ ]*/," ")	// Replace new lines with spaces
			.replace(/([\.])[\. ]+/,".")			// Check for duplicated terminators
			.replace(/[ ]*([\.])/,". ")				// Pad sentence terminators
			.replace(/\s+/," ")						// Remove multiple spaces
			.replace(/\s+$/,"");					// Strip trailing whitespace

		text += "."; // Add final terminator, just in case it's missing.

		return text;
	}

	var TextStatistics = function TextStatistics(text) {
		this.text = text ? cleanText(text) : this.text;
	};

	TextStatistics.prototype.readingEase = function(text) {
		text = text ? cleanText(text) : this.text;
		return Math.round((206.835 - (1.015 * this.averageWordsPerSentence(text)) - (84.6 * this.averageSyllablesPerWord(text)))*10)/10;
	};


	TextStatistics.prototype.textLength = function(text) {
		text = text ? cleanText(text) : this.text;
		return text.length;
	};

	TextStatistics.prototype.letterCount = function(text) {
		text = text ? cleanText(text) : this.text;
		text = text.replace(/[^a-z]+/ig,"");
		return text.length;
	};

	TextStatistics.prototype.sentenceCount = function(text) {
		text = text ? cleanText(text) : this.text;

		// Will be tripped up by "Mr." or "U.K.". Not a major concern at this point.
		return text.replace(/[^\.!?]/g, '').length || 1;
	};

	TextStatistics.prototype.wordCount = function(text) {
		text = text ? cleanText(text) : this.text;
		return text.split(/[^a-z0-9]+/i).length || 1;
	};

	TextStatistics.prototype.averageWordsPerSentence = function(text) {
		text = text ? cleanText(text) : this.text;
		return this.wordCount(text) / this.sentenceCount(text);
	};

	TextStatistics.prototype.averageSyllablesPerWord = function(text) {
		text = text ? cleanText(text) : this.text;
		var syllableCount = 0, wordCount = this.wordCount(text), self = this;

		text.split(/\s+/).forEach(function(word) {
			syllableCount += self.syllableCount(word);
		});

		// Prevent NaN...
		return (syllableCount||1) / (wordCount||1);
	};

	TextStatistics.prototype.bigWords = function(text){
		var self = this;
		text = text ? cleanText(text) : this.text;
		var bigWords = [];
		var adverbs = [];
		text.split(/\s+/).forEach(function(word) {
			word = word.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
			// if(!word.match(/^[A-Z]/)){
				if (self.syllableCount(word) > 2) {
					if (bigWords.indexOf(word) === -1){
						bigWords.push(word);
					}
				}
				if (word.match(/\w+ly/)) {
					if((adverbs.indexOf(word) === -1) && (notAdverbs.indexOf(word) === -1)) {
						adverbs.push(word);
					}
				}
			//}
		} );
		var obj = {"bigWords": bigWords,
			"adverbs": adverbs}
		return obj;
	}
	TextStatistics.prototype.wordsWithThreeSyllables = function(text, countProperNouns) {
		text = text ? cleanText(text) : this.text;
		var longWordCount = 0, self = this;

		countProperNouns = countProperNouns === false ? false : true;

		text.split(/\s+/).forEach(function(word) {

			// We don't count proper nouns or capitalised words if the countProperNouns attribute is set.
			// Defaults to true.
			if (!word.match(/^[A-Z]/) || countProperNouns) {
				if (self.syllableCount(word) > 2) {

					longWordCount ++;
				}
			}
		});

		return longWordCount;
	};

	TextStatistics.prototype.readingTime = function(text) {
		text = text ? cleanText(text) : this.text;
		return this.wordCount(text)/180
	}

	TextStatistics.prototype.percentageWordsWithThreeSyllables = function(text, countProperNouns) {
		text = text ? cleanText(text) : this.text;

		return (this.wordsWithThreeSyllables(text,countProperNouns) / this.wordCount(text)) * 100;
	};

	TextStatistics.prototype.syllableCount = function(word) {
		var syllableCount = 0,
			prefixSuffixCount = 0,
			wordPartCount = 0;
		scannedWords = this.scannedWords
		// Prepare word - make lower case and remove non-word characters
		word = word.toLowerCase().replace(/[^a-z]/g,"");

		// Specific common exceptions that don't follow the rule set below are handled individually
		// Array of problem words (with word as key, syllable count as value)
		var problemWords = {
			"simile":		3,
			"forever":		3,
			"shoreline":	2
		};

		// Return if we've hit one of those...
		if (problemWords[word]) return problemWords[word];

		// These syllables would be counted as two but should be one
		var subSyllables = [
			/cial/,
			/tia/,
			/cius/,
			/cious/,
			/giu/,
			/ion/,
			/iou/,
			/sia$/,
			/[^aeiuoyt]{2,}ed$/,
			/.ely$/,
			/[cg]h?e[rsd]?$/,
			/rved?$/,
			/[aeiouy][dt]es?$/,
			/[aeiouy][^aeiouydt]e[rsd]?$/,
			/^[dr]e[aeiou][^aeiou]+$/, // Sorts out deal, deign etc
			/[aeiouy]rse$/ // Purse, hearse
		];

		// These syllables would be counted as one but should be two
		var addSyllables = [
			/ia/,
			/riet/,
			/dien/,
			/iu/,
			/io/,
			/ii/,
			/[aeiouym]bl$/,
			/[aeiou]{3}/,
			/^mc/,
			/ism$/,
			/([^aeiouy])\1l$/,
			/[^l]lien/,
			/^coa[dglx]./,
			/[^gq]ua[^auieo]/,
			/dnt$/,
			/uity$/,
			/ie(r|st)$/
		];

		// Single syllable prefixes and suffixes
		var prefixSuffix = [
			/^un/,
			/^fore/,
			/ly$/,
			/less$/,
			/ful$/,
			/ers?$/,
			/ings?$/
		];

		// Remove prefixes and suffixes and count how many were taken
		prefixSuffix.forEach(function(regex) {
			if (word.match(regex)) {
				word = word.replace(regex,"");
				prefixSuffixCount ++;
			}
		});

		wordPartCount = word
			.split(/[^aeiouy]+/ig)
			.filter(function(wordPart) {
				return !!wordPart.replace(/\s+/ig,"").length
			})
			.length;

		// Get preliminary syllable count...
		syllableCount = wordPartCount + prefixSuffixCount;

		// Some syllables do not follow normal rules - check for them
		subSyllables.forEach(function(syllable) {
			if (word.match(syllable)) syllableCount --;
		});

		addSyllables.forEach(function(syllable) {
			if (word.match(syllable)) syllableCount ++;
		});


		return syllableCount || 1;
	};

	function textStatistics(text) {
		return new TextStatistics(text);
	}

	(typeof module != "undefined" && module.exports) ? (module.exports = textStatistics) : (typeof define != "undefined" ? (define("textstatistics", [], function() { return textStatistics; })) : (glob.textstatistics = textStatistics));
})(this);