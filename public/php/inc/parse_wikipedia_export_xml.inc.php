<?php
$pages = $parser->doc->getElementsByTagName('page');
$count = 0;
foreach ($pages as $page) {
    $idNode = $parser->getNodeByName($page, "id");

    $titleNode = $parser->getNodeByName($page, "title");
    if ($titleNode) {
        $title = $titleNode->nodeValue;
        // echo $title;

        $revisionNode = $parser->getNodeByName($page, "revision");
        if ($revisionNode) {
            $revision = $revisionNode->nodeValue;

            $textNode = $parser->getNodeByName($revisionNode, "text");
            if ($textNode) {
                $text = $textNode->nodeValue;

                $country = getCountryByTitle($countries, $title);

                if ($country[0] != "COUNTRY_NAME") {
                    // if ($country[0] == "China") {
                    // echo "Country:" . $country[0] . "\n<br>";

                    $destinations = parseWikiText($text, $debug, $country[0]);

                    if ($destinations) {
                        // echo $text;

                        $string = "\t{ \"name\": \"" . $country[0] . "\", \"code\": \"" . $country[1] . "\"";
                        if ($idNode) {
                            $string .= ", \"id\": \"" . $idNode->nodeValue . "\"";
                        }
                        $string .= ", \"destinations\": [";

                        foreach ($destinations as $key => $destination) {
                            // Post-process notes: strip wikitext citation/template
                            // markup and <ref> tags. The upstream row regex in
                            // parse_wikitext.inc.php sometimes truncates templates
                            // mid-expression (nested {{...}} or pipe-split cells),
                            // so we scrub here where all the noise converges.
                            $note = $destination['notes'] ?? '';
                            // Balanced templates first, repeatedly for nesting.
                            for ($i = 0; $i < 5; $i++) {
                                $new = preg_replace('/\{\{[^{}]*\}\}/s', '', $note);
                                if ($new === $note) break;
                                $note = $new;
                            }
                            // Unbalanced/truncated template fragments: strip any
                            // remaining `{{...` up to the nearest `}}` or end of
                            // string. Covers cases where upstream ate the close.
                            $note = preg_replace('/\{\{.*?(\}\}|$)/s', '', $note);
                            // <ref>...</ref> and self-closing <ref ... />.
                            $note = preg_replace('/<ref\b[^>]*\/\s*>/i', '', $note);
                            $note = preg_replace('/<ref\b[^>]*>.*?<\/ref>/is', '', $note);
                            // Bare `{}` / `{ }` leftover from mangled templates.
                            $note = preg_replace('/\{\s*\}/', '', $note);
                            // Notes that are now *only* punctuation / whitespace
                            // after stripping should become empty.
                            $trimmed = trim($note, " ,.;:-\t\n\r");
                            if ($trimmed === '') {
                                $note = '';
                            } else {
                                // Collapse runs of commas/whitespace left behind.
                                $note = preg_replace('/\s*,\s*(,\s*)+/', ', ', $note);
                                $note = preg_replace('/\s{2,}/', ' ', $note);
                                $note = trim($note, " ,\t\n\r");
                            }
                            $destination['notes'] = $note;

                            $d = "\t{ \"d_name\": " . json_encode($destination['d_name']) . ",
								\"visa_required\": " . json_encode($destination['visa_required']) . ",
								\"visa_title\": " . json_encode($destination['visa_title']) . ",
								\"notes\": " . json_encode($destination['notes']) . " }";
                            // echo $d . "<br/>";
                            $string .= $d;
                            if ($key < sizeof($destinations) - 1) {
                                $string .= ",";
                            }
                        }

                        $string .= "] }";

                        array_push($countries_json, $string);

                        $count++;
                        // if($count >= 300) {
                        //     break;
                        // }

                        // if($debug)
                        // echo sizeof($destinations) . ' destinations found for citizens from ' . $country[0] . '<br>';

                    } else {
                        echo "No destinations found in: <a href=\"" . $wikipedia_url . $country[2] . "\" target=\"_blank\">" . $title . "</a><br/>\n";
                    }

                }
            }
        }

    }
}
