You are decompiling an assembly function called `func_80091DFC_jp` in MIPS from a Nintendo 64 game.

# Examples

## `aSumClChest03_dt`

```c
void aSumClChest03_dt(FurnitureActor* this UNUSED, u8* data UNUSED) {
}
```

```asm
         sw a0, 0x0(sp)
         sw a1, 0x4(sp)
         jr ra
         nop 
```

## `aSumHalChest02_dt`

```c
void aSumHalChest02_dt(FurnitureActor* this UNUSED, u8* data UNUSED) {
}
```

```asm
         sw a0, 0x0(sp)
         sw a1, 0x4(sp)
         jr ra
         nop 
```

## `aSumBlueBureau01_dt`

```c
void aSumBlueBureau01_dt(FurnitureActor* this UNUSED, u8* data UNUSED) {
}
```

```asm
         sw a0, 0x0(sp)
         sw a1, 0x4(sp)
         jr ra
         nop 
```

## `func_80A93DD0_jp`

```c
void func_80A93DD0_jp(UNUSED Actor* thisx, UNUSED Game_Play* game_play) {
}
```

```asm
         sw a0, 0x0(sp)
         sw a1, 0x4(sp)
         jr ra
         nop 
```

## `func_80A93E38_jp`

```c
void func_80A93E38_jp(UNUSED Bee* this, UNUSED Game_Play* game_play) {
}
```

```asm
         sw a0, 0x0(sp)
         sw a1, 0x4(sp)
         jr ra
         nop 
```









# Primary Objective

Decompile the following target assembly function from `asm/jp/code/6B3DC0.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80091DFC_jp
nonmatching func_80091DFC_jp, 0x10
    /* 6B5A9C 80091DFC AFA40000 */  sw          $a0, 0x0($sp)
    /* 6B5AA0 80091E00 AFA50004 */  sw          $a1, 0x4($sp)
    /* 6B5AA4 80091E04 03E00008 */  jr          $ra
    /* 6B5AA8 80091E08 00000000 */   nop
endlabel func_80091DFC_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
