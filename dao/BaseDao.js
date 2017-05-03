                                                                                     
  //connection config
 
 function BaseDao(){
	 var mysql,conn
	 function init(){
       mysql = require('mysql') ;
       try{
           conn = mysql.createConnection(global.dbconfig);
       }catch(e){
           console.log("数据库连接错误："+e);
       }

	 }

     /**
      * 根据条件查询
      * @param sql
      * @param value
      * @param callBack
      */
	 this.query = function(sql,value,callBack){
		 conn.query(sql,value,function(error,results){
			 if(error){
				 console.log("错误是...."+error);
			 }else{
				 callBack(results);
			 }
	     });
	 }

     /**
      * 根据条件删除
      * @param sql  语句
      * @param value  参数
      * @param callBack
      */
	 this.delete = function(sql,value,callBack){
		  conn.query(sql,value,function(error,results){
			 if(error){
				 console.log("错误是...."+error);
			 }else{
				 callBack(results);
			 }
		  conn.end();
	     });
	 }
	 
	 init();
 }
 
module.exports = new BaseDao();