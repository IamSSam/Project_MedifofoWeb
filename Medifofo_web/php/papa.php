<?php
  header("Content-Type:application/json; charset=utf-8");
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  $client_id = "7rxySx5aIRXRGtWXULIS";
  $client_secret = "JGkB8R8zo5";
  $comment = $_GET['comment'];
  $encText = urlencode($comment);
   $postvars = "source=en&target=ko&text=".$encText;
   //$postvars = "source=ja&target=ko&text=".$encText;
   //$postvars = "source=zh-CN&target=ko&text=".$encText;
   $url = "https://openapi.naver.com/v1/language/translate";
   $is_post = true;
   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $url);
   curl_setopt($ch, CURLOPT_POST, $is_post);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
   curl_setopt($ch,CURLOPT_POSTFIELDS, $postvars);
   $headers = array();
   $headers[] = "X-Naver-Client-Id: ".$client_id;
   $headers[] = "X-Naver-Client-Secret: ".$client_secret;
   curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
   $response = curl_exec ($ch);
   $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
   //echo "status_code:".$status_code."<br>";
   curl_close ($ch);
   if($status_code == 200) {
     echo $response;
   } else {
     echo "Error 내용:".$response;
   }
?>
