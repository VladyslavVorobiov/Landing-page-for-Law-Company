<?php
$data='';

foreach ($_POST as $key => $value) {
  $data .= $key . ' = ' . $value . ' ';
}

		$to = "justlegal.company@gmail.com";
    $subject = "This is subject from customer";
    $header = "MIME-Version: 1.0\r\n";
        //$header .= "Content-type: text/html\r\n";
        
    $retval = mail ($to,$subject,$data,$header);
        
    if( $retval == true ) {
          // echo "Message sent successfully...";
    }else {
          // echo "Message could not be sent...";
    }

?>