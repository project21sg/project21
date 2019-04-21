import 'package:flutter/material.dart';
import 'dart:async';

const _instructions = [
  'Sit down on a chair, start the timer,',
  ' have the patient walk a full 1 meter around and',
  'stop the timer when the patient is sat back down again.',
];

class TUGSequence extends StatefulWidget {
  Function(Map<String, String>) fillUpData;

  TUGSequence(this.fillUpData);

  @override
  _TUGSequenceState createState() => _TUGSequenceState();
}

class _TUGSequenceState extends State<TUGSequence> {
  final _instructionTexts =
      _instructions.map((text) => Text(text, style: TextStyle(fontSize: 20.0)));

  bool _timerRecording = false;
  static double _tugDuration = 0.00;
  Timer _timer;

  _resetTugDuration() {
    setState(() => _tugDuration = 0);
  }

  _toggleStopwatch() {
    setState(() => _timerRecording = !_timerRecording);
    if (!_timerRecording) {
      widget.fillUpData(
          {'tugDuration': '$_tugDuration'}); // update main data state
      _timer.cancel();
    } else {
      _timer = Timer.periodic(Duration(seconds: 1),
          (Timer timer) => setState(() => _tugDuration += 1));
    }
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> _buildOrder = [];
    _buildOrder.add(Text('TUG Duration Test',
        style:
            TextStyle(fontWeight: FontWeight.bold, fontSize: 30.0))); // Header
    _buildOrder.addAll(_instructionTexts);
    _buildOrder.add(Text('${_tugDuration}s', style: TextStyle(fontSize: 80.0)));
    _buildOrder.add(
      Row(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
        ButtonTheme(
            height: 55.0,
            minWidth: 250.0,
            buttonColor: _timerRecording ? Colors.grey : Colors.lightGreen,
            child: RaisedButton.icon(
                onPressed: _toggleStopwatch,
                icon: Icon(_timerRecording ? Icons.pause : Icons.play_arrow),
                label: Text(
                  _timerRecording ? 'Stop' : 'Start',
                  textScaleFactor: 1.2,
                  style: TextStyle(fontWeight: FontWeight.bold),
                ))),
        ButtonTheme(
            height: 55.0,
            buttonColor: Colors.black,
            child: IconButton(
              onPressed: _resetTugDuration,
              icon: Icon(
                Icons.autorenew,
                size: 30.0,
              ),
            )),
      ]),
    );
    return Column(
      children: _buildOrder,
    );
  }
}
