let spritesPrefix = './Game/Assets/Sprites/'
let audioPrefix = './Game/Assets/Audio/'

AudioManager.instance = new AudioManager()
let engine = new Engine();

function playerInteractionScene()
{
    let interactionCheckerGO = new GameObject('interactionChecker', new Vector2D(0, 0),  new Vector2D(0, 0));
    let interactionChecker = new InteractionChecker();

    interactionCheckerGO.addComponent(interactionChecker);

    let interactionCanvas = new Canvas('Interaction Canvas', new Vector2D(1578, 969), []);
    let canvasArray = [interactionCanvas];

    let interactionScene = new Scene('interaction Scene', canvasArray);
    SceneManager.instance.addScene(interactionScene);

    interactionCanvas.addDrawObj(interactionCheckerGO);

    SceneManager.instance.loadScene(interactionScene.name);

    //* Create Background
    let backgroundGO = new GameObject('interactionChecker', new Vector2D(0, 0),  new Vector2D(1578, 969));
    let background = new EngineImage(spritesPrefix + "InteractionBackgroundImage.png", 'background');

    backgroundGO.addComponent(background);
    

    //* Create score text
    let scoreGO = new GameObject('Click Screen Text', new Vector2D(1578 / 2 - 380, 969 - 300), new Vector2D(200, 200));
    let scoreText = new EngineText("Click Screen To Play The Wizard of Fire");
    scoreText.font = "40px Comic Sans MS";

    scoreGO.addComponent(scoreText);


    interactionCanvas.addDrawObj(backgroundGO);
    interactionCanvas.addDrawObj(scoreGO);
}

function openningScene()
{
    let openningCanvas = new Canvas('Openning Canvas', new Vector2D(1578, 969), []);
    let canvasArray = [openningCanvas];

    var openningScene = new Scene('Openning Scene', canvasArray);
    SceneManager.instance.addScene(openningScene);

/************************************************************************************************************************/
    // * start scene init
    let sti = new StartSceneInit();
    let stiGO = new GameObject('iniy', new Vector2D(0, 0),  new Vector2D(0, 0)); 

    stiGO.addComponent(sti);

/************************************************************************************************************************/
    // * Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), 
    openningCanvas.size);

    let backgroundImg = new EngineImage(spritesPrefix + 'OpenningSceneBackground.png', 'test');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(18432 / 24, 512), new Vector2D(0, 0), 0.1, 0, [23]);
    backgroundSprite.name = 'backgroundSprite';

    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');

    backgroundGO.addComponent(backgroundAC);

  /************************************************************************************************************************/  

    //* Create Button 
    let playMainGameGO = new GameObject('play button', new Vector2D(110, 50), new Vector2D(210, 100));
    let playMainGameBtn = new Button(new EngineImage(spritesPrefix + "Play_Button.png", 'play game button'), function() {
        AudioManager.instance.playAudio(audioPrefix + "ButtonClick.wav");
        Engine.instance.sceneManager.loadScene("Main Scene");
    });
    
    playMainGameGO.addComponent(playMainGameBtn);

/************************************************************************************************************************/
    //* Create Instroctions title Text 
    let instructionsGO = new GameObject('instructions title GO', new Vector2D(100, 200), new Vector2D(100, 120));
    let instructionsText = new EngineText('Instructions');

    instructionsGO.addComponent(instructionsText);
    
/************************************************************************************************************************/
    //* Create arrow keys Text Instroctions  
    let instructionsArrowKeysGO = new GameObject('instruction arrow keys GO', new Vector2D(100, 245), new Vector2D(100, 165));
    let instructionsArrowKeysText = new EngineText('Press the arrow keys to move');

    instructionsArrowKeysGO.addComponent(instructionsArrowKeysText);

    /************************************************************************************************************************/
    //* Create attack Text Instroctions 
    let instructionsAttackGO = new GameObject('instruction attack key GO', new Vector2D(100, 290), new Vector2D(100, 210));
    let instructionsAttackText = new EngineText('Press E to attack');

    instructionsAttackGO.addComponent(instructionsAttackText);

/************************************************************************************************************************/
    //* add objs to canvas
    openningCanvas.addDrawObj(backgroundGO)
    openningCanvas.addDrawObj(instructionsGO);
    openningCanvas.addDrawObj(instructionsArrowKeysGO);
    openningCanvas.addDrawObj(instructionsAttackGO);
    openningCanvas.addDrawObj(playMainGameGO);
    openningCanvas.addDrawObj(stiGO);
}

function mainGameScene()
{
    var mainGameCanvas = new Canvas('Gameplay Canvas', new Vector2D(1578, 969), []);
    var canvasArray = [mainGameCanvas];
    
    var mainScene = new Scene('Main Scene', canvasArray);
    SceneManager.instance.addScene(mainScene);

/************************************************************************************************************************/

    //* Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), mainGameCanvas.size);
    let backgroundImg = new EngineImage(spritesPrefix + 'BackgroundSprite.png', 'Background');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(1968/3, 752/2), new Vector2D(0, 0), 0.1, 1, [1, 0]);
    backgroundSprite.name = 'backgroundSprite';

    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');

    backgroundGO.addComponent(backgroundAC);

/************************************************************************************************************************/
    //* Create Load Next Scene Trigger
    let nextSceneTriggerGO = new GameObject('end scene trigger', new Vector2D(1500, 633), new Vector2D(180, 180));
    let nextSceneTriggerCollider = new SquareCollider(new Vector2D(0, 0), new Vector2D(130, 160));
    let endSceenTrigger = new EndSceenTrigger('End Scene');

    nextSceneTriggerGO.addComponent(nextSceneTriggerCollider);
    nextSceneTriggerGO.addComponent(endSceenTrigger);

/************************************************************************************************************************/

    // * create scene initialization 
    let sceenInit = new MainSceneInit();
    let sceneInitGo = new GameObject('init', new Vector2D(0, 0), mainGameCanvas.size);
    sceneInitGo.addComponent(sceenInit);

/************************************************************************************************************************/

    //* Add GO's to canvas
    mainGameCanvas.addDrawObj(backgroundGO);
    mainGameCanvas.addDrawObj(nextSceneTriggerGO)
    mainGameCanvas.addDrawObj(sceneInitGo);

/************************************************************************************************************************/
    //* Create Axis
    let playerMovement = new Axis('Horizontal', 68, 65, 0.3, 0.2);
}

function endScene()
{
    let endSceneCanvas = new Canvas('Ending Canvas', new Vector2D(1578, 969), []);
    let canvasArray = [endSceneCanvas];

    var endScene = new Scene('End Scene', canvasArray);
    SceneManager.instance.addScene(endScene);

/************************************************************************************************************************/
    // * create scene initialization 
    let sceenInit = new EndSceneInit();
    let sceneInitGo = new GameObject('init', new Vector2D(0, 0), new Vector2D(0, 0));
    sceneInitGo.addComponent(sceenInit);

    // * Create Background
    let backgroundGO = new GameObject('backgroundImg', new Vector2D(0, 0), endSceneCanvas.size);
    let backgroundImg = new EngineImage(spritesPrefix + 'End Scene Background.png', 'End scene background');
    let backgroundSprite = new SpriteAnimation(backgroundImg, new Vector2D(0, 0), new Vector2D(13500  / 27, 475), new Vector2D(0, 0), 0.1, 0, [26]);
    backgroundSprite.name = 'backgroundSprite';

    let backgroundAC = new AnimationController();
    backgroundAC.addSpriteAnimation(backgroundSprite);
    backgroundAC.playAnimation('backgroundSprite');

    //* Create score text
    let scoreGO = new GameObject('scoreText', new Vector2D(1200, 130), new Vector2D(200, 200));
    let scoreText = new EngineText("Score: ");

    scoreGO.addComponent(scoreText);

    //* play background audio
    AudioManager.instance.playAudio("end scene background song");

    //* Create Game Over Text
    let gameOverGO = new GameObject('GameOver', new Vector2D(1200, 80), new Vector2D(200, 200));
    let gameOverText = new EngineText("Game Over");
    gameOverText.font = '40px Comic Sans MS'

    gameOverGO.addComponent(gameOverText);

    // *Create play game button
    let playMainGameGO = new GameObject('main game button game object', new Vector2D(110, 50), new Vector2D(210, 100));
    let playMainGameBtn = new Button(new EngineImage(spritesPrefix + "Play_Button.png", 'play game button'), function() {
        AudioManager.instance.playAudio(audioPrefix + "ButtonClick.wav");
        SceneManager.instance.loadScene("Openning Scene");
    });
        

    backgroundGO.addComponent(backgroundAC);
    playMainGameGO.addComponent(playMainGameBtn);

    endSceneCanvas.addDrawObj(backgroundGO);
    endSceneCanvas.addDrawObj(playMainGameGO);
    endSceneCanvas.addDrawObj(scoreGO);
    endSceneCanvas.addDrawObj(gameOverGO);

    endSceneCanvas.addDrawObj(sceneInitGo);
}

//* Add sounds
AudioManager.instance.addAudio(new EngineAudio("background", audioPrefix + "Castlevania Symphony of the Night OST Metamorphosis I.mp3", true));
AudioManager.instance.addAudio(new EngineAudio("fireBall sound", audioPrefix + "fireballSpawn.wav", false));
AudioManager.instance.addAudio(new EngineAudio("ButtonClick.wav", audioPrefix + "ButtonClick.wav", false));
AudioManager.instance.addAudio(new EngineAudio("ghost attack", audioPrefix + "Ghost Attack Sound.wav", false));
AudioManager.instance.addAudio(new EngineAudio("main game background song", audioPrefix + "Necropolis - Heroes of Might and Magic IV OST.mp3", true));
AudioManager.instance.addAudio(new EngineAudio("end scene background song", audioPrefix + "Castlevania SOTN Lost Painting.mp3", true));

let win = new Window();

SceneManager.instance.loadScene('Openning Scene');

playerInteractionScene();
openningScene();
mainGameScene();
endScene();
requestAnimationFrame(Engine.instance.run);