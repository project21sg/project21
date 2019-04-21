import 'package:flutter/material.dart';

/*
      name: DataTypes.STRING,
      dateUploaded: DataTypes.DATE,
      tugDuration: DataTypes.INTEGER,
      recentFalls: DataTypes.INTEGER,
      medications: DataTypes.INTEGER,
      psychological: DataTypes.INTEGER,
      cognitiveStatus: DataTypes.INTEGER,
      AMTS: DataTypes.INTEGER,
      riskFactor: DataTypes.INTEGER,
*/

const _textFields = [
  {
    'key': 'name',
    'label': 'Name',
  },
];

const _dropdownFields = [
  {
    'key': 'recentFalls',
    'label': 'Recent Falls',
    'hint': "Use patient's full history of falls to score this.",
    'values': [
      {'label': 'None in the last 12 months', 'value': '0'},
      {'label': '1 or more within 3 to 12 months ago', 'value': '1'},
      {'label': '1 or more in the last 3 months', 'value': '2'},
      {'label': '1 or more whilst inpatient/resident', 'value': '3'},
    ]
  },
  {
    'key': 'medications',
    'label': 'Medications',
    'hint':
        "Sedatives, Anti-depressants, Anti-parkinsons, Diuretics, Anti-hypertensives, Hypnotics.",
    'values': [
      {'label': 'Not taking any of these', 'value': '0'},
      {'label': 'Taking one', 'value': '1'},
      {'label': 'Taking two', 'value': '2'},
      {'label': 'Taking more than two', 'value': '3'},
    ]
  },
  {
    'key': 'psychological',
    'label': 'Psychological',
    'hint': "Anxiety, Depression, Poor Judgement regarding mobility, etc.",
    'values': [
      {'label': 'Does not appear to have any of these', 'value': '0'},
      {'label': 'Mildly affected by one or more', 'value': '1'},
      {'label': 'Moderately affected by one or more', 'value': '2'},
      {'label': 'Appears severely affected by one or more', 'value': '3'},
    ]
  },
  {
    'key': 'AMTS',
    'label': 'Cognitive Status',
    'hint': "Hadkinson Abbreviated Mental Test Scores.",
    'values': [
      {'label': 'AMTS 9/10 or Intact', 'value': '0'},
      {'label': 'AMTS 7/8, mildly impaired', 'value': '1'},
      {'label': 'AMTS 5/6, moderately impaired', 'value': '2'},
      {'label': 'AMTS 3/4 or less, severly impaired', 'value': '3'},
    ]
  },
];

const _riskFactorFields = [
  {
    'key': 0,
    'label': 'Reports/ observed difficulty with vision',
  },
  {
    'key': 1,
    'label': 'Mobility status unknown or appears unsafe',
  },
  {
    'key': 2,
    'label': 'Transfer status unknown or appears unsafe',
  },
  {
    'key': 3,
    'label': 'Observed comitting risk-taking behaviours',
  },
  {
    'key': 4,
    'label': 'Observed unsafe usage of equipment',
  },
  {
    'key': 5,
    'label': 'Unsafe footwear/ inappropriate clothing',
  },
  {
    'key': 6,
    'label': 'Difficulties with orientation to environment',
  },
  {
    'key': 7,
    'label': 'Underweight/ low appetite',
  },
  {
    'key': 8,
    'label': 'Reported/known urgency, nocturia, accidents',
  },
];

class QuestionaireSequence extends StatefulWidget {
  Function(Map<String, String>) fillUpData;

  QuestionaireSequence(this.fillUpData);

  @override
  _QuestionaireSequenceState createState() => _QuestionaireSequenceState();
}

class _QuestionaireSequenceState extends State<QuestionaireSequence> {
  final _formKey = GlobalKey<FormState>();

  Map<String, String> _dropdownLabels = Map.fromIterable(_dropdownFields,
      key: (item) => item['key'].toString(),
      value: (item) => item['values'][0]['value'].toString());

  Map<int, int> _riskFactorLabels = Map.fromIterable(
    _riskFactorFields,
    key: (item) => _riskFactorFields.indexOf(item),
    value: (item) => 0,
  );

  _updateRiskFactor(idx, value) {
    setState(() {
      _riskFactorLabels[idx] = value;
      widget.fillUpData({'riskFactor': _calculateRiskFactor()});
    });
  }

  _calculateRiskFactor() {
    return _riskFactorLabels.values
        .reduce((acc, next) => acc + next)
        .toString();
  }

  _updateChecklistFactors() {
    _dropdownLabels.forEach((key, value) => widget.fillUpData({key: value}));
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> _buildOrder = [];
    final List<Widget> _formItems = [];
    _formItems.addAll(_textFields.map((field) => TextFormField(
          decoration: InputDecoration(labelText: field['label']),
          validator: (value) {
            if (value.isEmpty) {
              return 'This cannot be empty!';
            }
          },
        )));
    _formItems.addAll(_dropdownFields.map((field) => DropdownButtonFormField(
        value: _dropdownLabels[field['key']],
        decoration: InputDecoration(
            labelText: field['label'], helperText: field['hint']),
        onChanged: (value) {
          _dropdownLabels[field['key']] = value;
          widget.fillUpData({field['key']: value});
        },
        items: List.from(field['values'])
            .map((item) => DropdownMenuItem(
                child: Text(item['label'].toString()),
                value: item['value'].toString()))
            .toList())));
    _formItems.addAll(_riskFactorFields.map((field) => Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            Text(field['label'], style: TextStyle(fontWeight: FontWeight.bold)),
            Radio(
                groupValue: _riskFactorLabels[field['key']],
                onChanged: (value) => _updateRiskFactor(field['key'], value),
                value: 1),
            Text('True'),
            Radio(
                groupValue: _riskFactorLabels[field['key']],
                onChanged: (value) => _updateRiskFactor(field['key'], value),
                value: 0),
            Text('False'),
          ],
        )));
    _buildOrder.add(
      Padding(
          padding: EdgeInsets.all(10.0),
          child: Form(
              autovalidate: true,
              key: _formKey,
              child: Column(
                children: _formItems,
              ))),
    );

    return Expanded(
        child: Container(
      child: ListView(
          scrollDirection: Axis.vertical,
          shrinkWrap: true,
          children: _buildOrder),
    ));
  }
}
