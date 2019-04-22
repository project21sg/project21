import 'package:flutter/material.dart';

class GaitSequence extends StatefulWidget {
  Function(Map<String, String>) fillUpData;

  GaitSequence(this.fillUpData);

  @override
  _GaitSequenceState createState() => _GaitSequenceState();
}

class _GaitSequenceState extends State<GaitSequence> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Text('gait'),
        RaisedButton(
          onPressed: () => widget.fillUpData({'gaitDataFile': 'path/to/file'}),
          child: Text('complete gait'),
        )
      ],
    );
  }
}
