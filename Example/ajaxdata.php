<?
//include ('JSON.php');
//$json=new JSON;
//$dateFormat="Y-m-d H:i:s";
//echo gmdate($dateFormat);
//$offset=5.5*60*60; //converting 5.5 hours to seconds.
//echo "--";
//echo gmdate($dateFormat, time()+$offset);
//die;
//sleep(10);
//echo "test work";

$json = $_POST['data'];
$person = json_decode($json);


$licount=$_GET['licount'];

//echo $licount;die;
$data='
<a class="img-cont" href="#">
<img alt="" src="assets/images/prd-1.jpg">
<span class="free-gift"><img src="assets/images/gift-icon.png"></span>
</a>
<a class="title" href="#">Sony PS2 Eye Toy Bundle </a>
<small> <span>MRP 895,900</span> | Save Rs.40,000</small> <strong>Rs. 855,900</strong>
<dfn class="prd-name padd-incrs"><span>•</span> Android V2.3 05</dfn>
<dfn class="prd-name"><span>•</span> 2MP Primary Camera</dfn>
';
$lidata=array();
for($i=0;$i<$licount;$i++)
{
  $lidata[$i]=array('htm' => $data, 'objid'=>$_GET['objid']);
}
echo json_encode($lidata);
?>