You are decompiling an assembly function called `func_809D18C8_jp` in MIPS from a Nintendo 64 game.







# Declarations for the functions called from the target assembly

- `void mDemo_Set_OrderValue(s32 type, s32 idx, u16 value);`
- `u16 mDemo_Get_OrderValue(s32 type, s32 idx);`
- `Choice* mChoice_Get_base_window_p();`
- `s32 mChoice_Get_ChoseNum(Choice* choice);`

# Types definitions used in the declarations

```c
typedef struct Choice {
    /* 0x00 */f32 centerX;
    /* 0x04 */f32 centerY;

    /* Initial XY position */
    /* 0x08 */ f32 centerXBegin;
    /* 0x0C */ f32 centerYBegin;

    /* Target XY position */
    /* 0x10 */ f32 centerXTarget;
    /* 0x14 */ f32 centerYTarget;

    /* Text settings */
    /* 0x18 */ Color_RGBA8 textColor;
    /* 0x1C */ f32 textScaleX;
    /* 0x20 */ f32 textScaleY;
    /* 0x24 */ f32 textX;
    /* 0x28 */ f32 textY;

    /* Window scaling XY */
    /* 0x2C */ f32 scaleX;
    /* 0x30 */ f32 scaleY;

    /* Text related data */
    /* 0x34 */ ChoiceData data;

    /* 0x84 */ s32 selectedChoiceIdx;
    /* 0x88 */ Color_RGBA8 selectedChoiceTextColor;

    /* 0x8C */ Color_RGBA8 backgroundColor;

    /* 0x90 */ f32 unk_D4;
    /* 0x94 */ f32 unk_D8;

    /* 0x98 */ f32 scale;  // total choice window scaling percentage

    /* 0x9C */ s32 mainIdx;
    /* 0xA0 */ s32 requestedMainIdx;

    /* 0xA4 */ s32 isWindowVisible;
    /* 0xA8 */ s32 isFontVisible;

    /* 0xAC */ s32 choiceAutomoveType;
    /* 0xB0 */ f32 choiceAutomoveTimer;

    /* 0xB4 */ f32 timer;

    /* 0xB8 */ u8 noBFlag;      // can't press B to select last option
    /* 0xB9 */ u8 noCloseFlag;  // pressing B won't auto-cancel the choice selection?
} Choice;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Npc_Super_Master/ac_npc_super_master/func_809D18C8_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_809D18C8_jp
nonmatching func_809D18C8_jp, 0x9C
    /* 8B50B8 809D18C8 27BDFFE0 */  addiu       $sp, $sp, -0x20
    /* 8B50BC 809D18CC AFBF0014 */  sw          $ra, 0x14($sp)
    /* 8B50C0 809D18D0 AFA40020 */  sw          $a0, 0x20($sp)
    /* 8B50C4 809D18D4 AFA50024 */  sw          $a1, 0x24($sp)
    /* 8B50C8 809D18D8 24040004 */  addiu       $a0, $zero, 0x4
    /* 8B50CC 809D18DC 0C01ED27 */  jal         mDemo_Get_OrderValue
    /* 8B50D0 809D18E0 24050009 */   addiu      $a1, $zero, 0x9
    /* 8B50D4 809D18E4 1040001B */  beqz        $v0, .L809D1954
    /* 8B50D8 809D18E8 2403FFFF */   addiu      $v1, $zero, -0x1
    /* 8B50DC 809D18EC 0C019410 */  jal         mChoice_Get_base_window_p
    /* 8B50E0 809D18F0 AFA30018 */   sw         $v1, 0x18($sp)
    /* 8B50E4 809D18F4 0C01953F */  jal         mChoice_Get_ChoseNum
    /* 8B50E8 809D18F8 00402025 */   or         $a0, $v0, $zero
    /* 8B50EC 809D18FC 10400006 */  beqz        $v0, .L809D1918
    /* 8B50F0 809D1900 8FA30018 */   lw         $v1, 0x18($sp)
    /* 8B50F4 809D1904 24010001 */  addiu       $at, $zero, 0x1
    /* 8B50F8 809D1908 10410005 */  beq         $v0, $at, .L809D1920
    /* 8B50FC 809D190C 8FAF0020 */   lw         $t7, 0x20($sp)
    /* 8B5100 809D1910 10000007 */  b           .L809D1930
    /* 8B5104 809D1914 2401FFFF */   addiu      $at, $zero, -0x1
  .L809D1918:
    /* 8B5108 809D1918 10000004 */  b           .L809D192C
    /* 8B510C 809D191C 00001825 */   or         $v1, $zero, $zero
  .L809D1920:
    /* 8B5110 809D1920 240E0001 */  addiu       $t6, $zero, 0x1
    /* 8B5114 809D1924 ADEE0954 */  sw          $t6, 0x954($t7)
    /* 8B5118 809D1928 24030001 */  addiu       $v1, $zero, 0x1
  .L809D192C:
    /* 8B511C 809D192C 2401FFFF */  addiu       $at, $zero, -0x1
  .L809D1930:
    /* 8B5120 809D1930 10610008 */  beq         $v1, $at, .L809D1954
    /* 8B5124 809D1934 24040004 */   addiu      $a0, $zero, 0x4
    /* 8B5128 809D1938 24050009 */  addiu       $a1, $zero, 0x9
    /* 8B512C 809D193C 0C01ED13 */  jal         mDemo_Set_OrderValue
    /* 8B5130 809D1940 00003025 */   or         $a2, $zero, $zero
    /* 8B5134 809D1944 8FA40020 */  lw          $a0, 0x20($sp)
    /* 8B5138 809D1948 8FA50024 */  lw          $a1, 0x24($sp)
    /* 8B513C 809D194C 0C274BC9 */  jal         func_809D2F24_jp
    /* 8B5140 809D1950 2406000E */   addiu      $a2, $zero, 0xE
  .L809D1954:
    /* 8B5144 809D1954 8FBF0014 */  lw          $ra, 0x14($sp)
    /* 8B5148 809D1958 27BD0020 */  addiu       $sp, $sp, 0x20
    /* 8B514C 809D195C 03E00008 */  jr          $ra
    /* 8B5150 809D1960 00000000 */   nop
endlabel func_809D18C8_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
