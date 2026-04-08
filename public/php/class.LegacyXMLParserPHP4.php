<?php
/*
============================================================================
LegacyXMLParser Class
2012-04-20

Markus Lerner
http://www.markuslerner.com

converted from LegacyXMLParser.as

using the DOM XML extension from php4
============================================================================
*/

class LegacyXMLParser {
	
	var $debug = true;
	var $doc;

	
	function LegacyXMLParser() {
	}
	

	function load($url) {
		if ($this->doc = domxml_open_file($url)) {
			if($this->debug) {
				echo "LegacyXMLParser | load | SUCCESS\n";
			}
		} else {
			if($this->debug) {
				echo "LegacyXMLParser | load | ERROR\n";
			}
		}
	}

	function loadXML($str) {
		if ($this->doc = domxml_open_mem($str)) {
			if($this->debug) {
				echo "LegacyXMLParser | loadXML | SUCCESS\n";
			}
		} else {
			if($this->debug) {
				echo "LegacyXMLParser | loadXML | ERROR\n";
			}
		}
	}
	
	function getRoot() {
		return $this->doc->document_element();
	}
		
	function getNodeByName($node, $name) {
		$childNodes = $node->child_nodes();
		for ($i = 0; $i < sizeof($childNodes); $i++) {
			$itemCurrent = $childNodes[$i];
			if ($itemCurrent->node_name() == $name) {
				return $itemCurrent;
			}
		}
		return null;
	}
	

	function getNodeListByName($node, $name) {
		$childNodes = $node->child_nodes();
		for ($i = 0; $i < sizeof($childNodes); $i++) {
			$itemCurrent = $childNodes[$i];
			if ($itemCurrent->node_name() == $name) {
				return $itemCurrent->child_nodes();
			}
		}
		return null;
	}
	

	function getAttributeValueByName($node, $name) {
		//echo "getAttributeValueByName:";
		//print_r( $node );
		//echo "\n";
				
		return $node->get_attribute($name);
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