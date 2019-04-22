import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import './gait_sequence.dart';
import './tug_sequence.dart';
import './qns_sequence.dart';

const List<Map<String, List<String>>> _sequences = [
  {
    'header': ['Step 1: Gait Recording'],
    'fields': ['gaitDataFile'],
  },
  {
    'header': ['Step 2: TUG Duration'],
    'fields': ['tugDuration'],
  },
  {
    'header': ['Step 3: Questionaires'],
    'fields': [
      'recentFalls',
      'medications',
      'psychological',
      'AMTS',
      'riskFactor'
    ],
  }
];

class TestSequences extends StatefulWidget {
  TestSequences();

  final baseUrl = DotEnv().env['BASE_URL'];

  @override
  _TestSequencesState createState() => _TestSequencesState();
}

class _TestSequencesState extends State<TestSequences> {
  int _currentSequence = 0;
  final Map<String, String> _testData = {};

  _fillUpData(Map<String, String> data) {
    data.forEach((key, value) => {
          setState(() {
            _testData[key] = value;
          })
        });
    print(_testData);
  }

  _validateData() {
    bool isAllPresent = true;
    _sequences.forEach((sequence) => sequence['fields'].forEach(
        (item) => isAllPresent = isAllPresent && _testData[item] != null));
    print(isAllPresent);
    return isAllPresent;
  }

  // retrive gaitData file and attach to payload
  // along with all other fields
  // upload to fixed address
  _uploadData() {}

  // so HACKY
  _checkProceed() {
    return _testData.length == 0 ||
        _sequences[_currentSequence]['fields']
            .map((field) => _testData[field] == null)
            .toList()
            .reduce((acc, next) => acc && next) ||
        _currentSequence == _sequences.length - 1;
  }

  _checkRetreat() {
    return _currentSequence == 0;
  }

  onNextPressed() {
    setState(() {
      _currentSequence = _currentSequence >= _sequences.length - 1
          ? _currentSequence
          : _currentSequence + 1;
    });
  }

  onBackPressed() {
    setState(() {
      _currentSequence =
          _currentSequence <= 0 ? _currentSequence : _currentSequence - 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    final currSequence = _sequences[_currentSequence];
    final String testSequenceHeader = currSequence['header'][0];

    final List<StatefulWidget> _sequenceWidgets = [
      GaitSequence(_fillUpData),
      TUGSequence(_fillUpData),
      QuestionaireSequence(_fillUpData),
    ];

    final _buildOrder = <Widget>[];
    _buildOrder.add(
      Row(
        children: <Widget>[
          Expanded(
              child: IconButton(
            onPressed: _checkRetreat() ? null : onBackPressed,
            icon: Icon(Icons.arrow_back_ios, size: 30),
          )),
          _sequences.length - 1 == _currentSequence
              ? ButtonTheme(
                  height: 35.0,
                  minWidth: 120.0,
                  buttonColor: Colors.teal,
                  child: RaisedButton.icon(
                      onPressed: _validateData() ? _uploadData : null,
                      icon: Icon(
                        Icons.cloud_upload,
                        color: Colors.white,
                      ),
                      label: Text(
                        'Submit',
                        textScaleFactor: 1.2,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      )))
              : Expanded(
                  child: Text('${_currentSequence + 1}/${_sequences.length}',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 20.0)),
                ),
          Expanded(
              child: IconButton(
            onPressed: _checkProceed() ? null : onNextPressed,
            icon: Icon(
              Icons.arrow_forward_ios,
              size: 30,
            ),
          )),
        ],
      ),
    );
    _buildOrder.add(_sequenceWidgets[_currentSequence]);
    return Scaffold(
        appBar: AppBar(
          title: Text(testSequenceHeader),
        ),
        body: Column(children: _buildOrder));
  }
}
