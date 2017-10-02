const express = require('express');
const router = express.Router();
const fuzzyis = require('fuzzyis');
const system = new fuzzyis.FIS('Tip system');
const LinguisticVariable = fuzzyis.LinguisticVariable;
const Term = fuzzyis.Term;
const Rule = fuzzyis.Rule;


/* GET home page. */
router.get('/', function(req, res, next) {
    system.addOutput(new LinguisticVariable('OA-type', [0, 45]));
    system.addInput(new LinguisticVariable('PAN', [0, 1]));
    system.addInput(new LinguisticVariable('MS', [0, 10]));
    system.addInput(new LinguisticVariable('GS', [0, 1]));
    system.addInput(new LinguisticVariable('BT', [0, 1]));
    system.addInput(new LinguisticVariable('DW', [0, 1]));
    system.addInput(new LinguisticVariable('BO', [0, 10]));
    system.addInput(new LinguisticVariable('JN', [0, 10]));
    system.addInput(new LinguisticVariable('CRP', [0, 10]));

    // take some shortcuts
    let TYPE = system.outputs[0];
    let PAN = system.inputs[0];
    let MS = system.inputs[1];
    let GS = system.inputs[2];
    let BT = system.inputs[3];
    let DW = system.inputs[4];
    let BO = system.inputs[5];
    let JN = system.inputs[6];
    let CRP = system.inputs[7];

    TYPE.addTerm(new Term('No', 'triangle', [0, 7.5, 15]));
    TYPE.addTerm(new Term('Hip', 'triangle', [15, 22.5, 30]));
    TYPE.addTerm(new Term('Knee', 'triangle', [30, 37.5, 45]));
    
    PAN.addTerm(new Term('No', 'trapeze', [-0.36, -0.04, 0.025, 0.2]));
    PAN.addTerm(new Term('Hip', 'triangle', [0.15, 0.375, 0.6]));
    PAN.addTerm(new Term('Knee', 'trapeze', [0.55, 0.7, 1, 1]));
    
    MS.addTerm(new Term('No', 'trapeze', [-36, -4, 3, 25]));
    MS.addTerm(new Term('Min', 'triangle', [20, 42.5, 60]));
    MS.addTerm(new Term('Max', 'trapeze', [55, 64.2, 100.2, 133]));
    
    GS.addTerm(new Term('No', 'triangle', [0, 0.15, 0.3]));
    GS.addTerm(new Term('Yes', 'triangle', [0.25, 0.625, 1]));
    
    BT.addTerm(new Term('No', 'triangle', [0, 0.3, 0.6]));
    BT.addTerm(new Term('Yes', 'triangle', [0.5, 0.75, 1]));

    DW.addTerm(new Term('No', 'triangle', [0, 0.3, 0.6]));
    DW.addTerm(new Term('Yes', 'triangle', [0.5, 0.75, 1]));

    BO.addTerm(new Term('No', 'triangle', [0, 30, 60]));
    BO.addTerm(new Term('Yes', 'triangle', [50, 72.5, 100]));

    JN.addTerm(new Term('No', 'triangle', [0, 25, 50]));
    JN.addTerm(new Term('Yes', 'triangle', [45, 72.5, 100]));

    CRP.addTerm(new Term('No', 'triangle', [0, 1.5, 3]));
    CRP.addTerm(new Term('Yes', 'triangle', [2.75, 6.375, 10]));

    system.rules = [
      new Rule(
          ['Knee', 'Max', 'Yes', 'Yes', 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Max', 'Yes', 'Yes', null, null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', null, 'Yes', 'Yes', 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Max', null, 'Yes', 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Max', 'Yes', null, 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', 'Yes', 'Yes', 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', 'Yes', 'Yes', null, null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', null, 'Yes', 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', 'Yes', null, 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, 'Yes', 'Yes', null],
          ['Hip'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, 'Yes', null, 'Yes'],
          ['Hip'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, null, 'Yes', 'Yes'],
          ['Hip'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, 'Yes', 'Yes', 'Yes'],
          ['Hip'],
          'and'
      ),
      new Rule(
          [null, null, null, null, null, null, null, null],
          ['No'],
          'and'
      ),
      new Rule(
          ['Knee', 'Max', 'Yes', null, null, null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Max', null, 'Yes', null, null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Max', null, null, 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', 'Yes', null, null, null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', null, 'Yes', null, null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', null, null, 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', null, 'Yes', 'Yes', null, null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', null, 'Yes', null, 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Knee', null, null, 'Yes', 'Yes', null, null, null],
          ['Knee'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, 'No', 'No', 'No'],
          ['No'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, 'Yes', 'No', 'No'],
          ['No'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, 'No', 'Yes', 'No'],
          ['No'],
          'and'
      ),
      new Rule(
          ['Hip', null, null, null, null, 'No', 'No', 'Yes'],
          ['No'],
          'and'
      ),
      new Rule(
          ['Knee', 'Max', 'No', 'No', 'No', null, null, null],
          ['No'],
          'and'
      ),
      new Rule(
          ['Knee', 'Min', 'No', 'No', 'No', null, null, null],
          ['No'],
          'and'
      ),
      new Rule(
          ['Knee', 'No', 'Yes', 'No', 'No', null, null, null],
          ['No'],
          'and'
      ),
      new Rule(
          ['Knee', 'No', 'No', 'Yes', 'No', null, null, null],
          ['No'],
          'and'
      ),
      new Rule(
          ['Knee', 'No', 'No', 'No', 'Yes', null, null, null],
          ['No'],
          'and'
      ),
      new Rule(
          ['Knee', 'No', 'No', 'No', 'No', null, null, null],
          ['No'],
          'and'
      )
    ];
  console.log(system.getPreciseOutput([0.747, 50, 0.5, 0.717, 0.152, 50, 17.4, 1.4]));
  console.log(system.getPreciseOutput([0.399, 90.6, 0.129, 0.283, 0.152, 27.5, 79.2, 6.91]));
  console.log(system.getPreciseOutput([0.5, 31.7, 0.399, 0.283, 0.152, 27.5, 21.9, 2.42]));
  console.log(system.getPreciseOutput([0.747, 90.6, 0.5, 0.717, 0.152, 27.5, 21.9, 2.42]));
  res.render('index', { title: 'Express' });
});

module.exports = router;
