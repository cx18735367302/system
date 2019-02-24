changeEvent (e) {   ------  //change事件方法
   let oFile = e.target.files[0]  ------  //获取文件对象
   let param = new FormData()  ------  //new一个formData
   param.append('file', oFile, oFile.name)   ------  //将文件添加到formdata中
   param.append('chunk', '0')
   let config = {
          headers: {'Content-Type': 'multipart/form-data'}
    }
   this.axios.post('/api/upload/upavatar?username=' + username, param, config) ------//传输数据
          .then(response => {
            if (response.data.data === 1) {  ------ //成功后的回掉
              let instance = Toast({
                message: '头像更改成功'
              })
              setTimeout(() => {
                instance.close()
              }, 1000)
            }
          })
 
}
