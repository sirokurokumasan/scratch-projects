class Add1{
  constructor(){}
  getInfo(){
    return{
      id:'add1'
      name:'便利系'
      blocks[
        {opcode:'and',blockType: Scratch.BlockType.REPORTER,text:'[A]と[B]と[C]'
         arguments:{
            A: {type: Scratch.ArgumentType.STRING,defaultValue: 'ねこ好きよ、集まれ。'},
            B: {type: Scratch.ArgumentType.STRING,defaultValue: 'にゃんにゃん♪'},
            C: {type: Scratch.ArgumentType.STRING,defaultValue: 'わーい！わーい！'},
        }},
      ]
    }
  }
  and(){
    return A : B : C;
  }
}
Scratch.extensions.register(new Add1())
