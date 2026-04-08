<?php
/*
============================================================================
LegacyXMLParser Class
2012-04-20

Markus Lerner
http://www.markuslerner.com

converted from LegacyXMLParser.as

using the DOM extension from php5
============================================================================
*/

class LegacyXMLParser {
	
	var $debug = false;
	var $doc;

	
	function __construct() {
		$this->doc = new DOMDocument();
		$this->doc->preserveWhiteSpace = false;
	}
	

	function load($url) {
		libxml_use_internal_errors(true);
		
		if ($this->doc->load($url)) {
			if($this->debug) {
				echo "LegacyXMLParser | load | SUCCESS\n";
			}
		} else {
			if($this->debug) {
				echo "LegacyXMLParser | load | ERROR\n";
			}
		}
		
		libxml_clear_errors();
	}
	
	
	function loadXML($string) {
		libxml_use_internal_errors(true);
		
		if ($this->doc->loadXML($string)) {
			if($this->debug) {
				echo "LegacyXMLParser | loadXML | SUCCESS\n";
			}
		} else {
			if($this->debug) {
				echo "LegacyXMLParser | loadXML | ERROR\n";
			}
		}
		
		libxml_clear_errors();
	}


	function getRoot() {
		return $this->doc->firstChild;
	}
	
	
	function getNodeByName($node, $name) {	
		for ($i = 0; $i < $node->childNodes->length; $i++) {
			$itemCurrent = $node->childNodes->item($i);
			if ($itemCurrent->nodeName == $name) {
				return $itemCurrent;
			}
		}
		return null;
	}
	

	function getNodeListByName($node, $name) {
		for ($i = 0; $i < $node->childNodes->length; $i++) {
			$itemCurrent = $node->childNodes->item($i);
			if ($itemCurrent->nodeName == $name) {
				return $itemCurrent->childNodes;
			}
		}
		return null;
	}
	

	function getAttributeValueByName($node, $name) {
		for ($i = 0; $i < $node->attributes->length; $i++) {
			$itemCurrent = $node->attributes->item($i);
			if ($itemCurrent->nodeName == $name) {
				return $itemCurrent->nodeValue;
			}
		}
		return null;
	}
	
	
	function getDocument() {
		return $this->doc;
	}
	
	
	function toString() {
		return "[LegacyXMLParser]";
	}

}


/*
header("Content-type: text/html; charset=UTF-8");

$myParser = new LegacyXMLParser();
$myParser->debug = false;
$myParser->load('main.xml');

$main = $myParser->getNodeByName($myParser->getRoot(), 'test');
echo $myParser->getAttributeValueByName($myParser->getRoot(), 'language');
*/


?>