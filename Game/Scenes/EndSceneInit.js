class EndSceneInit extends Component
{
    constructor()
    {
        super();
        this.firstRun = true;
    }

    onSceneLoad()
    {
        let scoreValueTextGO;

        if(!this.firstRun)
        {
            scoreValueTextGO = GameObject.find("scoreValueText");
        }

        if(scoreValueTextGO == null)
        {
            scoreValueTextGO = new GameObject('scoreValueText', new Vector2D(1300, 130), new Vector2D(200, 200));
            let scoreValueText = new EngineText("");

            scoreValueTextGO.addComponent(scoreValueText);
            SceneManager.instance.runningScene.canvaces[0].addDrawObj(scoreValueTextGO);
        }
        
        scoreValueTextGO.getComponent(EngineText).text = GameMaster.getInstance().scoreValueTextComp.text;

        this.firstRun = false;

        //* play background audio
        AudioManager.instance.playAudio("end scene background song");
    }

    onSceneExit()
    {
        AudioManager.instance.stopAudio("end scene background song");
    }
}