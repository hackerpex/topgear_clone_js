function Sound(source, volume, loop, tag)
{
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    this.tag = tag;
    this.soundFile = undefined;
  
    this.start = function()
    {
        
        this.soundFile = document.createElement("audio");
        this.soundFile.preload = "auto";
        var src = document.createElement("source");
        src.src = source;
        this.soundFile.appendChild(src);

        this.soundFile.load();
        this.soundFile.currentTime = 0.01;
        this.soundFile.play();
  

    }

}