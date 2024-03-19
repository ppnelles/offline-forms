<?php
define('ENV_STATUS', 'dev');

if(ENV_STATUS == 'dev') {
  $servername = "localhost";
  $username   = "root";
  $password   = "pmapass!";
  $dbname     = "offline_form";  
} else if(ENV_STATUS == 'prod') {
  $servername = "157.90.164.67";
  $username   = "offlineforms";
  $password   = "DZBrRQ03c1B9D8?LJX+BdBsRdw0{G{#Z";
  $dbname     = "offlineforms";
} 
  
?>