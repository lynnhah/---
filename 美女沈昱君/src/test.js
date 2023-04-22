var wiggleMaxLength = function(nums) {
    let flag=true,flag1=false;
    let res=[]
    res.push(nums[0])
    let index=0
    for(let i=1;i<nums.length;i++){
        if(flag||flag1){//正的
            if(res[index]<nums[i]){
                res.push(nums[i])
                index++;
                flag=false;
                continue;
            }
        }
        if(!flag||!flag1){//负的
            if(res[index]>nums[i]){
                res.push(nums[i])
                index++;
                flag=true;
                continue;
            }
        }
    }
    console.log(res)
    return res.length

};

console.log(wiggleMaxLength([3,3,3,2,5]))