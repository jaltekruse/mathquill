<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="src/main.css" type="text/css"/>
<link rel="stylesheet" href="mathquilled.css" type="text/css"/>
<!--[if lte IE 7]>
<style style="text/css">
.mathquill-editable .empty { width: 0.5em; }
.mathquill-rendered-math { min-width: 1.0em;}
.mathquill-rendered-math .numerator.empty, .mathquill-rendered-math .empty { padding: 0 0.25em;}
.mathquill-rendered-math sup { line-height: .8em; }
.mathquill-rendered-math .numerator {float: left; padding: 0;}
.mathquill-rendered-math .denominator { clear: both;width: auto;float: left;}
</style>
<![endif]-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
<script src="mathquill.php" type="text/javascript"></script>
<script src="AMtoMQ.js" type="text/javascript"></script>
<script src="mathquilled.js" type="text/javascript"></script>
</head>
<body>
<p><input type="text" class="use-mathquill" id="qn01" onfocus="showeedd('qn01',4,'ineq');" onblur="hideeedd()" />  </p>
<span class="mathquill-rendered-math">
<span class="fraction">
<span class="numerator"><span>3</span></span>
<span class="denominator"><span>4</span></span>
<span style="display:inline-block;width:0">&nbsp;</span>
</span></span>
<?php
require("mathquilled.html");
?>
</body>
</html>
