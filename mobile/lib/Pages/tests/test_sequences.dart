import 'package:flutter/material.dart';

const List<Map<String, List<String>>> _sequences = [
  {
    'header': ['Step 1: Gait Recording'],
    'fields': ['gaitDatafile'],
  },
  {
    'header': ['Step 2: TUG Duration'],
    'fields': ['tugDuration'],
  },
  {
    'header': ['Step 3: Questionaires'],
    'fields': ['speed']
  }
];

class TestSequences extends StatefulWidget {
  TestSequences();

  @override
  _TestSequencesState createState() => _TestSequencesState();
}

class _TestSequencesState extends State<TestSequences> {
  int _currentSequence = 0;
  final List<String> fields =
      _sequences.expand((seq) => seq['fields']).toList();
  final Map<String, String> _testData = {};

  // so HACKY
  _checkProceed() {
    return _testData.length == 0 ||
        _sequences[_currentSequence]['fields']
            .map((field) => _testData[field] == null)
            .toList()
            .reduce((acc, next) => acc && next) ||
        _currentSequence == _sequences.length - 1;
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

    return Scaffold(
        appBar: AppBar(
          title: Text(testSequenceHeader),
        ),
        body: Column(children: <Widget>[
          RaisedButton(
            onPressed: () => setState(() {
                  currSequence['fields']
                      .forEach((field) => _testData[field] = 'there');
                  print(_testData);
                }),
            child: Text('complete'),
          ),
          Row(
            children: <Widget>[
              Expanded(
                  child: RaisedButton.icon(
                onPressed: _currentSequence == 0 ? null : onBackPressed,
                icon: Icon(Icons.arrow_left),
                label: Text('Back'),
              )),
              Expanded(
                  child: RaisedButton.icon(
                onPressed: _checkProceed() ? null : onNextPressed,
                icon: Icon(Icons.arrow_right),
                label: Text('Next'),
              )),
            ],
          )
        ]));
  }
}
