const ArgumentType = require('../../extension-support/argument-type')
const BlockType = require('../../extension-support/block-type')
const Cast = require('../../util/cast')
const formatMessage = require('format-message')
const ml5 = require('ml5')
const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADTUlEQVRIS63VTWgUZxgH8P+7Mzsf+2U2SrPJKBoEA1WKUMzupaKHpgoetadCnaBN9FRaLLRQEW17KKIed1V21dJLbU/FRqiixx219NDaVi+NmnWNZT+cze7Ozsf7yoxEYpnMRJI5DQzP+5v3P8/7DEHANVHM7iXAVyAkwQCNgZYjDp3KH7jzZ1DdwmckBLirrE29KQgcTNOBZTrQdYP2es631LSPnp34zQqDlgTIcvTlOowxNBsG6o3uHw6he899eOt+EBIGeBHxUW5ElDjEYwKSKdFbzzAsVB61/q4lWlsvv3/XXAwJBOaL9pe29slE3MgoOSHF+N0DAwnwfASNehe1WudkYVw7sixgYfFkMXtSikU/VZQU3LhmHjVZ17Sz59Tbt/2QJe3glUIGMnEhe3PgjcR2Ny5dN/Df0873ebX8gS/wshUBUMK+PKveuhzWGZPF0fdiceHq4FAK3a6FyoyuFca13GKA14ruw8qM/ldhXNscBnz03duDUSY83jCchu04ePBvs5ZXtTW+wGQpW12/IZ1xP9r0dAM9g2bOH9Rmg5DDpW0ZwvFVD7CpW1ctqNqQP1DM/ZJRErvdFqw+bqHdMccKqvZr4AEsbdsVj4lTbkTttolqtXWloGp7FtlB7uv+1fIX6bSM9pyJJ9W5a3m1PAYC5ou4H7mUvT44mNwZTwio17to1Dsn8qp21Bc4cGl0WCLcP+vW9wkRQrxddNrW6cyw9NmxnTfthUX7ftgs9LcTP8dkfmxIWeW16cOHTdO22EheLU8v2qYTxezn6bT8zeo1MS/T2dk5GB3rHgNOMd6+SsFxnE3eJcAnohwdUZQkQAjqtTYadePHwri2L/CgHbuxg3/ywPhdUZJbJOnF3GnpPS9fw7ABAkgij3h8flS46REYPRvVig5KoebV8oXAg3bw4ugmjkV+6u+Xt/T1SSDE/wy6sTxrdiHHBYgCH4q8ssqLjOPHZYk/kkiKEUHg4Y5qBgbLpDBNG62W5Rhde4rjsGdISUEUgxHf1zx0MfsWdTBGCHIAeQeABbAyBdPmfziTpdz+SASlMOT1Z9GCoJeCLAtwrTBk2UAYsiKAH+JN2YreXDHg/wilzJ3Oz1YUmEcYY2fce0LIx88BFi6vvp70RPYAAAAASUVORK5CYII=";

const Message = {
  normalizeData: {
    'ja': 'データを正規化する',
    'ja-Hira': 'データをせいきかする',
    'en': 'normalize data'
  },
  train: {
    'ja': '訓練する',
    'ja-Hira': 'くんれんする',
    'en': 'train'
  },
  setInputs: {
    'ja': '入力データの [KEY] に [VALUE] をセットする',
    'ja-Hira': 'にゅうりょくデータの [KEY] に [VALUE] をセットする',
    'en': 'set [VALUE] to [KEY] of inputs data'
  },
  setOutput: {
    'ja': '出力データの [KEY] に [VALUE] をセットする',
    'ja-Hira': 'しゅつりょくデータの [KEY] に [VALUE] をセットする',
    'en': 'set [VALUE] to [KEY] of output data'
  },
  addData: {
    'ja': 'データを追加する',
    'ja-Hira': 'データを追加する',
    'en': 'addData'
  },
  setClassificationInputs: {
    'ja': '分類用入力データの [KEY] に [VALUE] をセットする',
    'ja-Hira': 'ぶんるいようにゅうりょくデータの [KEY] に [VALUE] をセットする',
    'en': 'set [VALUE] to [KEY] of classification inputs data'
  },
  classify: {
    'ja': '分類する',
    'ja-Hira': 'ぶんるいする',
    'en': 'classify'
  },
  getLabel: {
    'ja': 'ラベル',
    'ja-Hira': 'ラベル',
    'en': 'label'
  },
}
const AvailableLocales = ['en', 'ja', 'ja-Hira']

class Scratch3Nn2ScratchBlocks {

    constructor (runtime) {
        this.runtime = runtime;
        this.inputs = {};
        this.output = {};
        this.classificationInputs = {};
        this.label = null;

        const options = {
          task: 'classification'
        }
        this.nn = ml5.neuralNetwork(options);
    }

    getInfo () {
        this._locale = this.setLocale();

        return {
            id: 'nn2scratch',
            name: 'Nn2Scratch',
            blocks: [
                {
                    opcode: 'normalizeData',
                    blockType: BlockType.COMMAND,
                    text: Message.normalizeData[this._locale]
                },
                {
                    opcode: 'train',
                    blockType: BlockType.COMMAND,
                    text: Message.train[this._locale]
                },
                {
                    opcode: 'setInputs',
                    blockType: BlockType.COMMAND,
                    text: Message.setInputs[this._locale],
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER
                        }
                    }
                },
                {
                    opcode: 'setOutput',
                    blockType: BlockType.COMMAND,
                    text: Message.setOutput[this._locale],
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING
                        },
                        VALUE: {
                            type: ArgumentType.STRING
                        }
                    }
                },
                {
                    opcode: 'addData',
                    blockType: BlockType.COMMAND,
                    text: Message.addData[this._locale]
                },
                {
                    opcode: 'setClassificationInputs',
                    blockType: BlockType.COMMAND,
                    text: Message.setClassificationInputs[this._locale],
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING
                        },
                        VALUE: {
                            type: ArgumentType.STRING
                        }
                    }
                },
                {
                    opcode: 'classify',
                    blockType: BlockType.COMMAND,
                    text: Message.classify[this._locale]
                },
                {
                    opcode: 'getLabel',
                    text: Message.getLabel[this._locale],
                    blockType: BlockType.REPORTER
                },
            ]
        };
    }

    normalizeData() {
      this.nn.normalizeData()
    }

    train() {
      const trainingOptions = {
        epochs: 32,
        batchSize: 12
      }

      this.nn.train(trainingOptions, function() {
        console.log('Training is completed.')
      });
    }

    setInputs(args) {
      this.inputs[args.KEY] = Number(args.VALUE);
    }

    setOutput(args) {
      this.output[args.KEY] = args.VALUE;
    }

    addData() {
      this.nn.addData(this.inputs, this.output);
      console.log("addData:");
      console.log("inputs", this.inputs);
      console.log("output", this.output);
      this.inputs = {};
      this.output = {};
    }

    setClassificationInputs(args) {
      console.log("setClassificationInputs:")
      console.log(`inputs[${args.KEY}]=${Number(args.VALUE)}`);
      this.classificationInputs[args.KEY] = Number(args.VALUE);
    }

    classify() {
      this.nn.classify(this.classificationInputs, (error, result) => {
        if(error){
          console.error(error);
          return;
        }
        let maxConfidence = 0;
        let label = null;
        for (let i = 0; i < result.length; i++) {
          console.log(result[i].confidence)
          if (result[i].confidence > maxConfidence) {
            maxConfidence = result[i].confidence;
            label = result[i].label;
          }
        }
        this.label = label;
        this.classificationInputs = {};
      });
    }

    getLabel() {
      return this.label;
    }

    setLocale() {
      let locale = formatMessage.setup().locale;
      if (AvailableLocales.includes(locale)) {
        return locale;
      } else {
        return 'en';
      }
    }
}

module.exports = Scratch3Nn2ScratchBlocks;
