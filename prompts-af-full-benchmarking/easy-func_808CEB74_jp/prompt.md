You are decompiling an assembly function called `func_808CEB74_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808CEB74_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808CEB74_jp
nonmatching func_808CEB74_jp, 0x20
    /* 7C8244 808CEB74 27BDFFE0 */  addiu       $sp, $sp, -0x20
    /* 7C8248 808CEB78 AFBF0014 */  sw          $ra, 0x14($sp)
    /* 7C824C 808CEB7C 0C22D223 */  jal         func_808B488C_jp
    /* 7C8250 808CEB80 27A5001C */   addiu      $a1, $sp, 0x1C
    /* 7C8254 808CEB84 8FBF0014 */  lw          $ra, 0x14($sp)
    /* 7C8258 808CEB88 27BD0020 */  addiu       $sp, $sp, 0x20
    /* 7C825C 808CEB8C 03E00008 */  jr          $ra
    /* 7C8260 808CEB90 00000000 */   nop
endlabel func_808CEB74_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
