import 'package:flutter/material.dart';

class QuestionaireSequence extends StatefulWidget {
  Function(Map<String, String>) fillUpData;

  QuestionaireSequence(this.fillUpData);

  @override
  _QuestionaireSequenceState createState() => _QuestionaireSequenceState();
}

class _QuestionaireSequenceState extends State<QuestionaireSequence> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Text('gait'),
        RaisedButton(
          onPressed: () => widget.fillUpData({'speed': '1000'}),
          child: Text('complete qns'),
        )
      ],
    );
  }
}
