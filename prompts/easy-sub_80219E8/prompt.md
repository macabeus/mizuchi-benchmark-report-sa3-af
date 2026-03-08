You are decompiling an assembly function called `sub_80219E8` in ARMv4T from a Game Boy Advance game.

# Examples

## `Task_8099200`

```c
void Task_8099200(void)
{
#ifndef BUG_FIX
    s16 var_r0;
#else
    s16 var_r0 = 0;
#endif
    u8 var_r5;
    s32 playerIndex;

    CharacterSelect *cs = TASK_DATA(gCurTask);

    var_r5 = 0;
    playerIndex = gStageData.playerIndex;
    if ((cs->createIndex != 0) && (cs->createIndex != 3)) {
        if (cs->createIndex == 1) {
            if (playerIndex == 0) {
                var_r0 = sub_8024074(cs->unk4);
            } else {
                var_r0 = sub_8023E04();
            }
            cs->unk9 |= 0x10 & (u16)var_r0;
        }

        if (var_r0 < 0) {
            sub_802613C();
            return;
        }
    }
    {
        sub_809B13C(cs);
        sub_809ADF0(cs);
        sub_809AE50(cs);
        sub_809B69C(cs);
        sub_809B6C0(cs);
        sub_809B2AC(cs);

        if ((sub_809B148(cs) == TRUE) && (sub_809B184(cs) == TRUE)) {
            cs->qUnk5C = 0;
            gCurTask->main = Task_8098DE4;
        }
    }
}
```

```asm
         push {r4, lr}
         ldr r0, [pc, #0x28] # REFERENCE_.L2c
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         ldr r0, [pc, #0x20] # REFERENCE_.L30
         ldrb r1, [r0, #0x6]
         ldrb r0, [r4, #0x7]
         cmp r0, #0x0
         beq .L5236
         cmp r0, #0x3
         beq .L5236
         cmp r0, #0x1
         bne .L4631
         cmp r1, #0x0
         bne .L3423
         ldrb r0, [r4, #0x4]
         bl sub_8024074-0x4
         b .L3824
         .word gCurTask
         .word gStageData
     17bl sub_8023E04-0x4
     20lsl r0, #0x10
         lsr r2, r0, #0x10
         mov r0, #0x10
         and r0, r2
         ldrb r1, [r4, #0x9]
         orr r0, r1
         strb r0, [r4, #0x9]
     15lsl r0, r2, #0x10
         cmp r0, #0x0
         bge .L5236
         bl sub_802613C-0x4
         b .L9662
     11mov r0, r4
         bl sub_809B13C-0x4
         mov r0, r4
         bl sub_809ADF0-0x4
         mov r0, r4
         bl sub_809AE50-0x4
         mov r0, r4
         bl sub_809B69C-0x4
         mov r0, r4
         bl sub_809B6C0-0x4
         mov r0, r4
         bl sub_809B2AC-0x4
         mov r0, r4
         bl sub_809B148-0x4
         cmp r0, #0x1
         bne .L9662
         mov r0, r4
         bl sub_809B184-0x4
         cmp r0, #0x1
         bne .L9662
         mov r0, #0x0
         str r0, [r4, #0x5c]
         ldr r0, [pc, #0xc] # REFERENCE_.L9c
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.La0
         str r0, [r1, #0x8]
     35pop {r4}
         pop {r0}
         bx r0
         .word gCurTask
         .word Task_8098DE4
```

## `Task_8020660`

```c
void Task_8020660()
{
    Cheese *cheese = TASK_DATA(gCurTask);
    Player *player;
    s32 temp_r0;
    u16 var_r0;

    if (cheese->player->moveState & 1) {
        cheese->moveState |= CMS_FACING_LEFT;
    } else {
        cheese->moveState &= ~CMS_FACING_LEFT;
    }

    player = cheese->player;
    cheese->qWorldX2 = player->qWorldX;
    cheese->qWorldY2 = player->qWorldY;
    cheese->qWorldX = player->qWorldX;
    cheese->qWorldY = player->qWorldY;
    sub_8020284();
}
```

```asm
         push {lr}
         ldr r0, [pc, #0x20] # REFERENCE_.L24
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r2, r1, r0
         ldr r0, [r2, #0x50]
         ldr r0, [r0, #0x4]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L2819
         ldrh r1, [r2, #0x16]
         mov r0, #0x1
         orr r0, r1
         b .L2e22
         .hword 0x0
         .word gCurTask
     12ldrh r1, [r2, #0x16]
         ldr r0, [pc, #0x20] # REFERENCE_.L4c
         and r0, r1
     16strh r0, [r2, #0x16]
         ldr r1, [r2, #0x50]
         ldr r0, [r1, #0x10]
         str r0, [r2, #0x8]
         ldr r0, [r1, #0x14]
         str r0, [r2, #0xc]
         ldr r0, [r1, #0x10]
         str r0, [r2, #0x0]
         ldr r0, [r1, #0x14]
         str r0, [r2, #0x4]
         bl sub_8020284-0x4
         pop {r0}
         bx r0
         .hword 0x0
         .word 0xfffe
```

## `Task_80206B0`

```c
void Task_80206B0()
{
    Cheese *cheese = TASK_DATA(gCurTask);
    Player *player;
    s32 temp_r0;

    if (cheese->player->moveState & 1) {
        cheese->moveState |= CMS_FACING_LEFT;
    } else {
        cheese->moveState &= ~CMS_FACING_LEFT;
    }

    player = cheese->player;
    cheese->qWorldX2 = player->qWorldX;
    cheese->qWorldY2 = player->qWorldY;
    cheese->qWorldX = player->qWorldX;
    cheese->qWorldY = player->qWorldY;
    sub_8020284();
}
```

```asm
         push {lr}
         ldr r0, [pc, #0x20] # REFERENCE_.L24
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r2, r1, r0
         ldr r0, [r2, #0x50]
         ldr r0, [r0, #0x4]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L2819
         ldrh r1, [r2, #0x16]
         mov r0, #0x1
         orr r0, r1
         b .L2e22
         .hword 0x0
         .word gCurTask
     12ldrh r1, [r2, #0x16]
         ldr r0, [pc, #0x20] # REFERENCE_.L4c
         and r0, r1
     16strh r0, [r2, #0x16]
         ldr r1, [r2, #0x50]
         ldr r0, [r1, #0x10]
         str r0, [r2, #0x8]
         ldr r0, [r1, #0x14]
         str r0, [r2, #0xc]
         ldr r0, [r1, #0x10]
         str r0, [r2, #0x0]
         ldr r0, [r1, #0x14]
         str r0, [r2, #0x4]
         bl sub_8020284-0x4
         pop {r0}
         bx r0
         .hword 0x0
         .word 0xfffe
```

## `Task_801F418`

```c
void Task_801F418(void)
{
    Cheese *cheese = TASK_DATA(gCurTask);
    Player *player = cheese->player;

    cheese->qWorldX = player->qWorldX;

    if (player->moveState & 0x10000) {
        cheese->qWorldY = player->qWorldY + Q(12);
    } else {
        cheese->qWorldY = player->qWorldY - Q(12);
    }

    if (cheese->player->moveState & 1) {
        cheese->moveState |= 1;
    } else {
        cheese->moveState &= ~1;
    }

    sub_8020284();
    if (cheese->player->charFlags.anim0 != 0xBE) {
        if ((cheese->player->unkC & 0x18) == 0x10) {
            gCurTask->main = sub_801EF6C;
        } else {
            gCurTask->main = Task_801EE74;
        }
    }
}
```

```asm
         push {r4, lr}
         ldr r0, [pc, #0x28] # REFERENCE_.L2c
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         ldr r2, [r4, #0x50]
         ldr r0, [r2, #0x10]
         str r0, [r4, #0x0]
         ldr r0, [r2, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L3023
         ldr r0, [r2, #0x14]
         mov r1, #0xc0
         lsl r1, #0x4
         add r0, r1
         b .L3626
         .hword 0x0
         .word gCurTask
     15ldr r0, [r2, #0x14]
         ldr r2, [pc, #0x18] # REFERENCE_.L4c
         add r0, r2
     20str r0, [r4, #0x4]
         ldr r0, [r4, #0x50]
         ldr r0, [r0, #0x4]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L5038
         ldrh r1, [r4, #0x16]
         mov r0, #0x1
         orr r0, r1
         b .L5641
         .word 0xfffff400
     32ldrh r1, [r4, #0x16]
         ldr r0, [pc, #0x24] # REFERENCE_.L78
         and r0, r1
     36strh r0, [r4, #0x16]
         bl sub_8020284-0x4
         ldr r1, [r4, #0x50]
         mov r2, #0x30
         ldrsh r0, [r1, r2]
         cmp r0, #0xbe
         beq .L8c64
         ldr r0, [r1, #0xc]
         mov r1, #0x18
         and r0, r1
         cmp r0, #0x10
         bne .L8460
         ldr r0, [pc, #0x8] # REFERENCE_.L7c
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x8] # REFERENCE_.L80
         b .L8a63
         .word 0xfffe
         .word gCurTask
         .word sub_801EF6C
     52ldr r0, [pc, #0xc] # REFERENCE_.L94
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.L98
     56str r0, [r1, #0x8]
     47pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word gCurTask
         .word Task_801EE74
```

## `Task_801F9D4`

```c
void Task_801F9D4(void)
{
    Cheese *cheese = TASK_DATA(gCurTask);
    s32 var_r0_2;
    u16 var_r0;

    if (cheese->player->moveState & 1) {
        cheese->moveState |= 1;
    } else {
        cheese->moveState &= ~1;
    }

    sub_8020130(0);
    cheese->unk1A -= 1;
    if (cheese->unk1C != 0) {
        cheese->qWorldX = cheese->player->qWorldX - ((0xF - cheese->unk1A) * 0x600);
    } else {
        cheese->qWorldX = cheese->player->qWorldX + ((0xF - cheese->unk1A) * 0x600);
    }

    sub_8020284();
    if (cheese->unk1A == 0) {
        gCurTask->main = Task_801EE74;
    }
}
```

```asm
         push {r4, lr}
         ldr r0, [pc, #0x20] # REFERENCE_.L24
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         ldr r0, [r4, #0x50]
         ldr r0, [r0, #0x4]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L2819
         ldrh r1, [r4, #0x16]
         mov r0, #0x1
         orr r0, r1
         b .L2e22
         .hword 0x0
         .word gCurTask
     12ldrh r1, [r4, #0x16]
         ldr r0, [pc, #0x2c] # REFERENCE_.L58
         and r0, r1
     16strh r0, [r4, #0x16]
         mov r0, #0x0
         bl sub_8020130-0x4
         ldrb r0, [r4, #0x1a]
         sub r0, #0x1
         strb r0, [r4, #0x1a]
         ldrb r0, [r4, #0x1c]
         cmp r0, #0x0
         beq .L5c43
         ldr r2, [r4, #0x50]
         ldrb r1, [r4, #0x1a]
         mov r0, #0xf
         sub r0, r1
         lsl r1, r0, #0x1
         add r1, r0
         lsl r1, #0x9
         ldr r0, [r2, #0x10]
         sub r0, r1
         b .L6e52
         .hword 0x0
         .word 0xfffe
     30ldr r2, [r4, #0x50]
         ldrb r1, [r4, #0x1a]
         mov r0, #0xf
         sub r0, r1
         lsl r1, r0, #0x1
         add r1, r0
         lsl r1, #0x9
         ldr r0, [r2, #0x10]
         add r0, r1
     40str r0, [r4, #0x0]
         bl sub_8020284-0x4
         ldrb r0, [r4, #0x1a]
         cmp r0, #0x0
         bne .L8261
         ldr r0, [pc, #0xc] # REFERENCE_.L88
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.L8c
         str r0, [r1, #0x8]
     56pop {r4}
         pop {r0}
         bx r0
         .word gCurTask
         .word Task_801EE74
```

# Primary Objective

Decompile the following target assembly function from `asm/code_0_2.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80219E8
sub_80219E8: @ 0x080219E8
	push {r4, lr}
	ldr r0, _08021A60 @ =gCurTask
	ldr r0, [r0]
	ldrh r1, [r0, #6]
	movs r0, #0xc0
	lsls r0, r0, #0x12
	adds r3, r1, r0
	movs r2, #0
	movs r4, #0xff
_080219FA:
	lsls r0, r2, #2
	adds r0, r0, r2
	lsls r0, r0, #3
	adds r0, #4
	adds r1, r3, r0
	ldrb r0, [r1, #0x1b]
	orrs r0, r4
	strb r0, [r1, #0x1b]
	adds r0, r2, #1
	lsls r0, r0, #0x18
	lsrs r2, r0, #0x18
	cmp r2, #0xb
	bls _080219FA
	movs r0, #0xf2
	lsls r0, r0, #1
	adds r1, r3, r0
	movs r0, #0xff
	strb r0, [r1, #0x1b]
	movs r0, #0x83
	lsls r0, r0, #2
	adds r1, r3, r0
	movs r0, #1
	rsbs r0, r0, #0
	strb r0, [r1, #0x1b]
	movs r0, #0x8d
	lsls r0, r0, #2
	adds r1, r3, r0
	movs r0, #1
	rsbs r0, r0, #0
	strb r0, [r1, #0x1b]
	movs r0, #0x97
	lsls r0, r0, #2
	adds r1, r3, r0
	movs r0, #1
	rsbs r0, r0, #0
	strb r0, [r1, #0x1b]
	movs r0, #0xa1
	lsls r0, r0, #2
	adds r1, r3, r0
	movs r0, #1
	rsbs r0, r0, #0
	strb r0, [r1, #0x1b]
	movs r0, #0xab
	lsls r0, r0, #2
	adds r1, r3, r0
	movs r0, #1
	rsbs r0, r0, #0
	strb r0, [r1, #0x1b]
	pop {r4}
	pop {r0}
	bx r0
	.align 2, 0
_08021A60: .4byte gCurTask
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
