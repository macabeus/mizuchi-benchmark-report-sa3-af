You are decompiling an assembly function called `sub_8078F74` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_80C59E8`

```c
void sub_80C59E8() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x34
         str r0, [sp, #0x20]
         str r2, [sp, #0x24]
         mov r9, r3
         ldr r0, [sp, #0x54]
         lsl r1, #0x18
         lsl r0, #0x10
         lsr r0, #0x10
         lsr r1, #0x8
         ldr r2, [pc, #0x80] # REFERENCE_.La0
         add r1, r2
         lsr r7, r1, #0x10
         lsl r1, r7, #0x10
         cmp r1, #0x0
         bge .L2a21
         b .L35a414
     19lsl r0, #0x10
         asr r0, #0x10
         str r0, [sp, #0x28]
         lsl r3, r0, #0x1
         str r3, [sp, #0x2c]
         add r4, sp, #0x4
         mov r10, r4
     413asr r0, r1, #0xe
         ldr r1, [sp, #0x20]
         add r0, r1
         ldr r5, [r0, #0x0]
         ldr r1, [pc, #0x60] # REFERENCE_.La4
         mov r0, r5
         add r0, #0x10
         str r0, [r1, #0x0]
         add r2, sp, #0x4
         str r2, [r1, #0x4]
         ldr r0, [pc, #0x58] # REFERENCE_.La8
         str r0, [r1, #0x8]
         ldr r0, [r1, #0x8]
         ldr r3, [sp, #0x28]
         cmp r3, #0x0
         beq .Lb084
         ldr r2, [pc, #0x50] # REFERENCE_.Lac
         mov r4, #0x80
         lsl r4, #0x1
         add r0, r3, r4
         lsl r0, #0x1
         add r0, r2
         mov r1, #0x0
         ldrsh r3, [r0, r1]
         mov r4, #0xc
         ldrsh r0, [r5, r4]
         mov r1, r3
         mul r1, r0
         asr r1, #0x6
         ldr r0, [sp, #0x2c]
         add r2, r0, r2
         mov r4, #0x0
         ldrsh r2, [r2, r4]
         mov r4, #0xe
         ldrsh r0, [r5, r4]
         mul r0, r2
         asr r0, #0x6
         sub r1, r0
         str r1, [sp, #0x18]
         mov r1, #0xc
         ldrsh r0, [r5, r1]
         mov r1, r2
         mul r1, r0
         asr r1, #0x6
         mov r2, #0xe
         ldrsh r0, [r5, r2]
         mul r0, r3
         asr r0, #0x6
         add r1, r0
         add r0, sp, #0x18
         str r1, [r0, #0x4]
         b .Lc293
         .word 0xffff0000
         .word 0x40000d4
         .word 0x84000001
         .word gSineTable
     43mov r3, #0xc
         ldrsh r0, [r5, r3]
         lsl r0, #0x8
         str r0, [sp, #0x18]
         mov r4, #0xe
         ldrsh r0, [r5, r4]
         lsl r0, #0x8
         add r1, sp, #0x18
         str r0, [r1, #0x4]
     79mov r1, r9
         mov r2, #0x0
         ldrsh r0, [r1, r2]
         mov r3, #0x80
         lsl r3, #0x1
         cmp r0, r3
         bne .Lea113
         mov r4, #0x2
         ldrsh r0, [r1, r4]
         lsl r1, r7, #0x10
         str r1, [sp, #0x30]
         ldr r2, [sp, #0x24]
         ldr r4, [r2, #0x0]
         ldr r6, [r2, #0x4]
         add r3, sp, #0x14
         mov r8, r3
         mov r1, #0x80
         lsl r1, #0x1
         cmp r0, r1
         beq .L136151
     99mov r2, r9
         mov r3, #0x0
         ldrsh r1, [r2, r3]
         ldr r0, [sp, #0x18]
         mul r0, r1
         asr r0, #0x8
         str r0, [sp, #0x18]
         mov r4, #0x2
         ldrsh r1, [r2, r4]
         ldr r0, [sp, #0x1c]
         mul r0, r1
         asr r0, #0x8
         str r0, [sp, #0x1c]
         mov r3, #0x0
         lsl r0, r7, #0x10
         str r0, [sp, #0x30]
         ldr r1, [sp, #0x24]
         ldr r4, [r1, #0x0]
         ldr r6, [r1, #0x4]
         add r2, sp, #0x14
         mov r8, r2
     150lsl r0, r3, #0x1
         mov r2, sp
         add r2, r0
         add r2, #0x4
         add r0, r9
         mov r7, #0x0
         ldrsh r1, [r0, r7]
         mov r7, #0x0
         ldrsh r0, [r2, r7]
         mul r0, r1
         asr r0, #0x8
         strh r0, [r2, #0x0]
         add r0, r3, #0x1
         lsl r0, #0x18
         lsr r3, r0, #0x18
         cmp r3, #0x1
         bls .L114134
     112ldr r0, [sp, #0x18]
         add r0, r4, r0
         str r0, [sp, #0x18]
         ldr r0, [sp, #0x1c]
         add r0, r6, r0
         str r0, [sp, #0x1c]
         ldrh r0, [r5, #0xa]
         ldr r1, [sp, #0x28]
         add r2, r1, r0
         ldr r3, [pc, #0x138] # REFERENCE_.L284
         mov r0, r3
         and r2, r0
         mov r4, r8
         strh r2, [r4, #0x0]
         mov r7, #0x0
         ldrsh r0, [r4, r7]
         strh r0, [r5, #0x2c]
         ldrb r0, [r5, #0x2]
         cmp r0, #0x0
         beq .L16e178
         mov r0, r5
         add r0, #0x30
         ldrb r1, [r5, #0x2]
         str r2, [sp, #0x0]
         add r2, sp, #0x18
         add r3, sp, #0x4
         bl sub_80C59E8-0x4
     170ldr r4, [r5, #0x14]
         cmp r4, #0x0
         bne .L176182
         b .L34a406
     180ldr r0, [r5, #0x4]
         mov r1, #0x4
         and r0, r1
         cmp r0, #0x0
         beq .L182188
         b .L34a406
     186ldr r6, [r5, #0x18]
         ldr r0, [r6, #0x0]
         and r0, r1
         ldr r1, [r4, #0x8]
         cmp r0, #0x0
         beq .L19a200
         mov r0, #0x80
         lsl r0, #0x7
         and r0, r1
         cmp r0, #0x0
         beq .L19a200
         b .L34a406
     193ldr r2, [pc, #0xec] # REFERENCE_.L288
         and r2, r1
         str r2, [r4, #0x8]
         ldr r1, [r5, #0x4]
         mov r3, #0xc0
         lsl r3, #0x10
         and r1, r3
         lsr r1, #0x16
         ldr r0, [r6, #0x0]
         and r0, r3
         lsr r0, #0x16
         add r1, r0
         lsl r1, #0xc
         orr r2, r1
         str r2, [r4, #0x8]
         ldr r1, [r5, #0x4]
         ldr r2, [pc, #0xd0] # REFERENCE_.L28c
         and r1, r2
         lsr r1, #0xd
         ldr r0, [r6, #0x0]
         and r0, r2
         lsr r0, #0xd
         add r1, r0
         lsl r1, #0x6
         strh r1, [r4, #0x14]
         ldr r0, [r5, #0x18]
         ldr r0, [r0, #0x0]
         mov r1, #0x8
         and r0, r1
         cmp r0, #0x0
         bne .L1da232
         b .L2ea360
     230mov r1, r8
         mov r2, #0x0
         ldrsh r0, [r1, r2]
         cmp r0, #0x0
         bne .L216262
         mov r3, r9
         mov r4, #0x0
         ldrsh r0, [r3, r4]
         mov r7, #0x80
         lsl r7, #0x1
         cmp r0, r7
         bne .L216262
         mov r1, #0x2
         ldrsh r0, [r3, r1]
         cmp r0, r7
         bne .L216262
         ldr r0, [r5, #0x14]
         ldr r0, [r0, #0x8]
         mov r1, #0xc0
         lsl r1, #0x9
         and r0, r1
         lsr r0, #0xf
         cmp r0, #0x1
         bls .L2ea360
         ldr r0, [pc, #0x84] # REFERENCE_.L290
         ldrh r1, [r0, #0x0]
         mov r0, #0x3
         and r0, r1
         cmp r0, #0x0
         beq .L2ea360
     236ldr r3, [r5, #0x14]
         ldr r1, [r3, #0x8]
         mov r0, #0x20
         neg r0, r0
         and r1, r0
         str r1, [r3, #0x8]
         ldr r4, [pc, #0x70] # REFERENCE_.L294
         ldrb r2, [r4, #0x0]
         mov r0, #0x20
         orr r0, r2
         orr r1, r0
         str r1, [r3, #0x8]
         mov r2, r8
         mov r3, #0x0
         ldrsh r0, [r2, r3]
         cmp r0, #0x0
         bne .L250291
         mov r7, r10
         mov r0, #0x0
         ldrsh r1, [r7, r0]
         mov r2, #0x80
         lsl r2, #0x1
         cmp r1, r2
         bne .L250291
         ldrh r0, [r7, #0x2]
         lsl r0, #0x10
         asr r0, #0x10
         cmp r0, r1
         beq .L256294
     278ldrb r0, [r4, #0x0]
         add r0, #0x1
         strb r0, [r4, #0x0]
     290add r0, sp, #0x8
         mov r3, r8
         ldrh r1, [r3, #0x0]
         strh r1, [r0, #0x0]
         mov r4, r10
         mov r7, #0x0
         ldrsh r1, [r4, r7]
         mov r3, #0x80
         lsl r3, #0x11
         asr r2, r3, #0x10
         mov r3, r0
         cmp r1, r2
         bgt .L27a312
         ldrh r0, [r4, #0x2]
         lsl r0, #0x10
         asr r0, #0x10
         cmp r0, r2
         ble .L298322
     306ldr r0, [r5, #0x14]
         ldr r1, [r0, #0x8]
         mov r2, #0x40
         orr r1, r2
         b .L2a2327
         .word 0x3ff
         .word 0xffffcfff
         .word 0x3fe000
         .word gDispCnt
         .word gNextFreeAffineIndex
     311ldr r0, [r5, #0x14]
         ldr r1, [r0, #0x8]
         mov r2, #0x41
         neg r2, r2
         and r1, r2
     316str r1, [r0, #0x8]
         mov r4, r10
         ldrh r0, [r4, #0x0]
         strh r0, [r3, #0x2]
         ldrh r0, [r4, #0x2]
         strh r0, [r3, #0x4]
         ldr r0, [sp, #0x18]
         asr r0, #0x8
         strh r0, [r3, #0x6]
         ldr r0, [sp, #0x1c]
         asr r0, #0x8
         strh r0, [r3, #0x8]
         ldr r0, [r5, #0x20]
         ldr r0, [r0, #0x4]
         mov r1, #0xf0
         lsl r1, #0x18
         and r0, r1
         cmp r0, #0x0
         beq .L2e0356
         ldr r0, [r5, #0x14]
         ldr r2, [r0, #0x8]
         lsr r2, #0xf
         lsl r2, #0x4
         ldr r1, [pc, #0x8] # REFERENCE_.L2dc
         add r2, r1
         mov r1, r3
         bl sub_80BECF8-0x4
         b .L32e394
         .word gEmptyTask
     345ldr r0, [r5, #0x14]
         mov r1, r3
         bl TransformSprite-0x4
         b .L32e394
     231ldr r1, [r5, #0x14]
         ldr r0, [sp, #0x18]
         asr r0, #0x8
         strh r0, [r1, #0x10]
         ldr r1, [r5, #0x14]
         ldr r0, [sp, #0x1c]
         asr r0, #0x8
         strh r0, [r1, #0x12]
         ldr r3, [r5, #0x14]
         ldr r2, [r3, #0x8]
         mov r0, #0x21
         neg r0, r0
         and r2, r0
         str r2, [r3, #0x8]
         ldr r0, [r5, #0x4]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L318383
         mov r0, #0x80
         lsl r0, #0x3
         orr r2, r0
         str r2, [r3, #0x8]
     378ldr r0, [r5, #0x4]
         mov r1, #0x2
         and r0, r1
         cmp r0, #0x0
         beq .L32e394
         ldr r0, [r5, #0x14]
         ldr r1, [r0, #0x8]
         mov r2, #0x80
         lsl r2, #0x4
         orr r1, r2
         str r1, [r0, #0x8]
     354ldr r2, [r5, #0x14]
         ldr r0, [r2, #0x8]
         mov r1, #0xc0
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L344404
         mov r0, r2
         bl sub_80BE46C-0x4
         b .L34a406
     400mov r0, r2
         bl DisplaySprite-0x4
     181ldr r7, [sp, #0x30]
         ldr r1, [pc, #0x1c] # REFERENCE_.L36c
         add r0, r7, r1
         lsr r7, r0, #0x10
         lsl r1, r7, #0x10
         cmp r1, #0x0
         blt .L35a414
         b .L3828
     20add sp, #0x34
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0xffff0000
```

## `sub_80617E0`

```c
bool32 sub_80617E0(Hariisen *enemy, u8 param1)
{
    Vec2_32 sp00[2];
    s32 var_r1;
    u32 var_r2;
    u16 theta;
    u8 i;
    s32 shift = 6;
    u8 var_sb;

    var_sb = 0;
    for (i = 0; i < 2; i++) {
        sp00[0].x = 0;
        sp00[0].y = 0;
        theta = gUnknown_080D20AC[i];
        sp00[1].x = (SIN_24_8(((theta & 0xFF) * 4)) * 16) + (SIN_24_8(((theta & 0xFF) * 4)) << 1);
        sp00[1].y = (COS_24_8(((theta & 0xFF) * 4)) * 16) + (COS_24_8(((theta & 0xFF) * 4)) << 1);
        if (i != 0) {
            sp00[1].y += 0x100;
        }
        enemy->qUnk2C[i].y = sp00[0].y;
        enemy->qUnk2C[i].x = sp00[0].x;
        enemy->qUnk2C[i].y += ((sp00[1].y - sp00[0].y) >> shift) * ((enemy->unk10[i]) >> 6);
        enemy->qUnk2C[i].x += ((sp00[1].x - sp00[0].x) >> shift) * ((enemy->unk10[i]) >> 6);

        if (param1 == 1) {
            var_r2 = 0x48;
            var_r1 = 1;
        } else {
            var_r2 = 0x40;
            var_r1 = 4;
        }

        if ((u32)(enemy->unk10[i] >> 6) < var_r2) {
            enemy->unk10[i] += (1 << (var_r1 + 3));
        } else {
            enemy->unk10[i] = var_r2 << 6;
            var_sb += 1;
        }
    }

    for (i = 0; i < 4; i++) {
        sp00[0].x = 0;
        sp00[0].y = 0;
        theta = gUnknown_080D20B0[i];
        sp00[1].x = (SIN_24_8(((theta & 0xFF) * 4)) << 3) + (SIN_24_8(((theta & 0xFF) * 4)) << 2);
        sp00[1].y = (COS_24_8(((theta & 0xFF) * 4)) << 3) + (COS_24_8(((theta & 0xFF) * 4)) << 2);

        if (i < 2) {
            sp00[1].x += 0x200;
        }
        if ((i == 0) || (i == 3)) {
            sp00[1].y += 0x200;
        }

        enemy->qUnk3C[i].y = sp00[0].y;
        enemy->qUnk3C[i].x = sp00[0].x;
        enemy->qUnk3C[i].y += ((sp00[1].y - sp00[0].y) >> shift) * (enemy->unk14[i] >> 6);
        enemy->qUnk3C[i].x += ((sp00[1].x - sp00[0].x) >> shift) * (enemy->unk14[i] >> 6);

        if (param1 == 1) {
            var_r2 = 0x54;
            var_r1 = 1;
        } else {
            var_r2 = 0x40;
            var_r1 = 4;
        }

        if ((enemy->unk14[i] >> 6) < var_r2) {
            enemy->unk14[i] += (1 << (var_r1 + 3));
        } else {
            enemy->unk14[i] = var_r2 << 6;
            var_sb += 1;
        }
    }

    if (var_sb == 6) {
        return TRUE;
    }

    return FALSE;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x1c
         mov r12, r0
         lsl r1, #0x18
         lsr r1, #0x18
         str r1, [sp, #0x10]
         mov r0, #0x6
         mov r10, r0
         mov r1, #0x0
         mov r9, r1
         mov r7, #0x0
     121mov r0, #0x0
         str r0, [sp, #0x0]
         str r0, [sp, #0x4]
         lsl r0, r7, #0x1
         mov r8, r0
         ldr r0, [pc, #0x90] # REFERENCE_.Lbc
         add r0, r8
         ldrb r2, [r0, #0x0]
         lsl r0, r2, #0x3
         ldr r1, [pc, #0x8c] # REFERENCE_.Lc0
         add r0, r1
         ldrh r0, [r0, #0x0]
         lsl r0, #0x10
         asr r0, #0x16
         lsl r1, r0, #0x4
         lsl r0, #0x1
         add r1, r0
         str r1, [sp, #0x8]
         lsl r2, #0x3
         mov r0, #0x80
         lsl r0, #0x2
         add r2, r0
         ldr r1, [pc, #0x74] # REFERENCE_.Lc0
         add r2, r1
         ldrh r0, [r2, #0x0]
         lsl r0, #0x10
         asr r0, #0x16
         lsl r1, r0, #0x4
         lsl r0, #0x1
         add r0, r1, r0
         str r0, [sp, #0xc]
         cmp r7, #0x0
         beq .L6852
         mov r1, #0x80
         lsl r1, #0x1
         add r0, r1
         str r0, [sp, #0xc]
     47lsl r0, r7, #0x3
         mov r2, r12
         add r2, #0x30
         add r2, r0
         ldr r3, [sp, #0x4]
         str r3, [r2, #0x0]
         mov r4, r12
         add r4, #0x2c
         add r4, r0
         ldr r5, [sp, #0x0]
         str r5, [r4, #0x0]
         ldr r1, [sp, #0xc]
         sub r1, r3
         mov r0, r10
         asr r1, r0
         mov r6, r12
         add r6, #0x10
         mov r0, r8
         add r3, r6, r0
         ldrh r0, [r3, #0x0]
         lsr r0, #0x6
         mul r1, r0
         ldr r0, [r2, #0x0]
         add r0, r1
         str r0, [r2, #0x0]
         ldr r1, [sp, #0x8]
         sub r1, r5
         mov r0, r10
         asr r1, r0
         ldrh r0, [r3, #0x0]
         lsr r0, #0x6
         mul r1, r0
         ldr r0, [r4, #0x0]
         add r0, r1
         str r0, [r4, #0x0]
         ldr r1, [sp, #0x10]
         cmp r1, #0x1
         bne .Lc496
         mov r2, #0x48
         mov r1, #0x1
         b .Lc898
         .hword 0x0
         .word gUnknown_080D20AC
         .word gSineTable
     89mov r2, #0x40
         mov r1, #0x4
     92lsl r0, r7, #0x1
         add r6, r0
         ldrh r3, [r6, #0x0]
         lsr r0, r3, #0x6
         cmp r0, r2
         bhs .Le0110
         add r1, #0x3
         mov r0, #0x1
         lsl r0, r1
         add r0, r3, r0
         strh r0, [r6, #0x0]
         b .Lee117
     103lsl r0, r2, #0x6
         strh r0, [r6, #0x0]
         mov r0, r9
         add r0, #0x1
         lsl r0, #0x18
         lsr r0, #0x18
         mov r9, r0
     109add r0, r7, #0x1
         lsl r0, #0x18
         lsr r7, r0, #0x18
         cmp r7, #0x1
         bls .L1e15
         mov r7, #0x0
         mov r0, r12
         add r0, #0x40
         str r0, [sp, #0x18]
         mov r1, r12
         add r1, #0x3c
         str r1, [sp, #0x14]
         mov r0, #0x14
         add r0, r12
         mov r8, r0
         ldr r1, [pc, #0xa4] # REFERENCE_.L1b4
         mov r12, r1
     243mov r0, #0x0
         str r0, [sp, #0x0]
         str r0, [sp, #0x4]
         lsl r3, r7, #0x1
         ldr r1, [pc, #0x9c] # REFERENCE_.L1b8
         add r0, r3, r1
         ldrb r1, [r0, #0x0]
         lsl r0, r1, #0x3
         add r0, r12
         ldrh r0, [r0, #0x0]
         lsl r0, #0x10
         asr r0, #0x16
         lsl r2, r0, #0x3
         lsl r0, #0x2
         add r2, r0
         str r2, [sp, #0x8]
         lsl r1, #0x3
         mov r0, #0x80
         lsl r0, #0x2
         add r1, r0
         add r1, r12
         ldrh r0, [r1, #0x0]
         lsl r0, #0x10
         asr r0, #0x16
         lsl r1, r0, #0x3
         lsl r0, #0x2
         add r1, r0
         str r1, [sp, #0xc]
         mov r6, r3
         cmp r7, #0x1
         bhi .L156169
         mov r1, #0x80
         lsl r1, #0x2
         add r0, r2, r1
         str r0, [sp, #0x8]
     164cmp r7, #0x0
         beq .L15e173
         cmp r7, #0x3
         bne .L168178
     170ldr r0, [sp, #0xc]
         mov r1, #0x80
         lsl r1, #0x2
         add r0, r1
         str r0, [sp, #0xc]
     172lsl r2, r7, #0x3
         ldr r0, [sp, #0x18]
         add r3, r0, r2
         ldr r0, [sp, #0x4]
         str r0, [r3, #0x0]
         ldr r1, [sp, #0x14]
         add r2, r1, r2
         ldr r5, [sp, #0x0]
         str r5, [r2, #0x0]
         ldr r1, [sp, #0xc]
         sub r1, r0
         mov r0, r10
         asr r1, r0
         mov r0, r8
         add r4, r0, r6
         ldrh r0, [r4, #0x0]
         lsr r0, #0x6
         mul r1, r0
         ldr r0, [r3, #0x0]
         add r0, r1
         str r0, [r3, #0x0]
         ldr r1, [sp, #0x8]
         sub r1, r5
         mov r0, r10
         asr r1, r0
         ldrh r0, [r4, #0x0]
         lsr r0, #0x6
         mul r1, r0
         ldr r0, [r2, #0x0]
         add r0, r1
         str r0, [r2, #0x0]
         ldr r1, [sp, #0x10]
         cmp r1, #0x1
         bne .L1bc218
         mov r2, #0x54
         mov r1, #0x1
         b .L1c0220
         .hword 0x0
         .word gSineTable
         .word gUnknown_080D20B0
     211mov r2, #0x40
         mov r1, #0x4
     214mov r0, r8
         add r3, r0, r6
         ldrh r4, [r3, #0x0]
         lsr r0, r4, #0x6
         cmp r0, r2
         bhs .L1d8232
         add r1, #0x3
         mov r0, #0x1
         lsl r0, r1
         add r0, r4, r0
         strh r0, [r3, #0x0]
         b .L1e6239
     225lsl r0, r2, #0x6
         strh r0, [r3, #0x0]
         mov r0, r9
         add r0, #0x1
         lsl r0, #0x18
         lsr r0, #0x18
         mov r9, r0
     231add r0, r7, #0x1
         lsl r0, #0x18
         lsr r7, r0, #0x18
         cmp r7, #0x3
         bls .L110134
         mov r1, r9
         cmp r1, #0x6
         beq .L1fa249
         mov r0, #0x0
         b .L1fc250
     246mov r0, #0x1
     248add sp, #0x1c
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
```

## `Task_803E0D8`

```c
void Task_803E0D8(void)
{
    SlowChaosLift *lift = TASK_DATA(gCurTask);
    Sprite *s = &lift->s;
    s32 r4 = I((lift->unk64 + Q(0.5)) & ONE_CYCLE);
    u8 arr[4];
    s16 i;

#ifndef NON_MATCHING
    register s32 r0 asm("r0") = r4;
    register s32 r1 asm("r1");
    register s32 r2 asm("r2");
#else
    s32 r0 = r4;
    s32 r1;
    s32 r2;
#endif

    switch (r0) {
        case 0: {
            r2 = sub_80517FC(I(lift->qWorldY), I(lift->qWorldX), 0, +8, arr, sub_805217C);
        } break;

        case 1: {
            r2 = sub_80517FC(I(lift->qWorldX), I(lift->qWorldY), 0, -8, arr, sub_805203C);
        } break;

        case 2: {
            r2 = sub_80517FC(I(lift->qWorldY), I(lift->qWorldX), 0, -8, arr, sub_805217C);
        } break;

        case 3: {
            r2 = sub_80517FC(I(lift->qWorldX), I(lift->qWorldY), 0, +8, arr, sub_805203C);
        } break;
    }

    r0 = r4;
    switch (r0) {
        case 0: {
            r1 = Q(r2);
            lift->qWorldY += r1;
        } break;

        case 1: {
            r1 = Q(r2);
            lift->qWorldX -= r1;
        } break;

        case 2: {
            r1 = Q(r2);
            lift->qWorldY -= r1;
        } break;

        case 3: {
            r1 = Q(r2);
            lift->qWorldX += r1;
        } break;
    }

    lift->unk64 = arr[0] * 4;
    lift->qUnk66 = Q(1.25);

    lift->qUnk68 = (COS(lift->unk64) * lift->qUnk66) >> 14;
    lift->qUnk6A = (SIN(lift->unk64) * lift->qUnk66) >> 14;

    lift->qWorldX += lift->qUnk68;
    lift->qWorldY += lift->qUnk6A;

    for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
        bool32 cond = FALSE;
        Player *p = GET_SP_PLAYER_V0(i);
        u32 res;

        if (!sub_802C0D4(p)) {
            if ((p->moveState & MOVESTATE_COLLIDING_ENT) && (p->sprColliding == s)) {
                p->qWorldY += Q(2);

                p->qWorldX += lift->qUnk68;
                p->qWorldY += lift->qUnk6A;

                if (sub_801226C(p) < 0) {
                    Player_HitWithoutRingsUpdate(p);
                } else {
                    cond = TRUE;
                }
            }

            res = sub_8020950(s, I(lift->qWorldX), I(lift->qWorldY), p, 1);

            if (res & 0x10000) {
                p->qWorldY += Q_8_8(res);

                if (!cond) {
                    p->qSpeedGround >>= 2;
                    p->qSpeedAirX >>= 2;
                    p->qSpeedAirY >>= 2;
                }
            }
        }
    }

    UpdateAnimOrDestroy();
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0xc
         ldr r0, [pc, #0x2c] # REFERENCE_.L3c
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r6, r0, r1
         add r1, #0xc
         add r1, r0
         mov r8, r1
         ldr r3, [pc, #0x20] # REFERENCE_.L40
         add r0, r3
         ldrh r0, [r0, #0x0]
         add r0, #0x80
         ldr r1, [pc, #0x1c] # REFERENCE_.L44
         and r0, r1
         lsr r4, r0, #0x8
         mov r0, r4
         cmp r0, #0x1
         beq .L6848
         cmp r0, #0x1
         bgt .L4833
         cmp r0, #0x0
         beq .L5238
         b .Lba86
         .word gCurTask
         .word 0x3000064
         .word 0x3ff
     26cmp r0, #0x2
         beq .L8461
         cmp r0, #0x3
         beq .La074
         b .Lba86
     28ldr r0, [r6, #0x60]
         asr r0, #0x8
         ldr r1, [r6, #0x5c]
         asr r1, #0x8
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x4] # REFERENCE_.L64
         b .Lae81
         .hword 0x0
         .word sub_805217C
     24ldr r0, [r6, #0x5c]
         asr r0, #0x8
         ldr r1, [r6, #0x60]
         asr r1, #0x8
         mov r3, #0x8
         neg r3, r3
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x4] # REFERENCE_.L80
         str r2, [sp, #0x4]
         mov r2, #0x0
         b .Lb484
         .word sub_805203C
     34ldr r0, [r6, #0x60]
         asr r0, #0x8
         ldr r1, [r6, #0x5c]
         asr r1, #0x8
         mov r3, #0x8
         neg r3, r3
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x4] # REFERENCE_.L9c
         str r2, [sp, #0x4]
         mov r2, #0x0
         b .Lb484
         .word sub_805217C
     36ldr r0, [r6, #0x5c]
         asr r0, #0x8
         ldr r1, [r6, #0x60]
         asr r1, #0x8
         add r3, sp, #0x8
         str r3, [sp, #0x0]
         ldr r2, [pc, #0x1c] # REFERENCE_.Lcc
     45str r2, [sp, #0x4]
         mov r2, #0x0
         mov r3, #0x8
     59bl sub_80517FC-0x4
         mov r2, r0
     29mov r0, r4
         cmp r0, #0x1
         beq .Le4106
         cmp r0, #0x1
         bgt .Ld096
         cmp r0, #0x0
         beq .Lda101
         b .Lfe119
         .hword 0x0
         .word sub_805203C
     90cmp r0, #0x2
         beq .Lec110
         cmp r0, #0x3
         beq .Lf6115
         b .Lfe119
     92lsl r1, r2, #0x8
         ldr r0, [r6, #0x60]
         add r0, r1
         str r0, [r6, #0x60]
         b .Lfe119
     88lsl r1, r2, #0x8
         ldr r0, [r6, #0x5c]
         sub r0, r1
         b .Lfc118
     97lsl r1, r2, #0x8
         ldr r0, [r6, #0x60]
         sub r0, r1
         str r0, [r6, #0x60]
         b .Lfe119
     99lsl r1, r2, #0x8
         ldr r0, [r6, #0x5c]
         add r0, r1
     109str r0, [r6, #0x5c]
     93add r0, sp, #0x8
         ldrb r0, [r0, #0x0]
         lsl r0, #0x2
         mov r1, r6
         add r1, #0x64
         strh r0, [r1, #0x0]
         mov r4, #0x66
         add r4, r6
         mov r12, r4
         mov r2, #0xa0
         lsl r2, #0x1
         strh r2, [r4, #0x0]
         ldr r4, [pc, #0x60] # REFERENCE_.L178
         ldrh r0, [r1, #0x0]
         mov r3, #0x80
         lsl r3, #0x1
         add r0, r3
         lsl r0, #0x1
         add r0, r4
         mov r3, #0x0
         ldrsh r0, [r0, r3]
         mul r0, r2
         asr r0, #0xe
         mov r3, r6
         add r3, #0x68
         strh r0, [r3, #0x0]
         ldrh r0, [r1, #0x0]
         lsl r0, #0x1
         add r0, r4
         mov r4, #0x0
         ldrsh r1, [r0, r4]
         mov r2, r12
         mov r4, #0x0
         ldrsh r0, [r2, r4]
         mul r0, r1
         asr r0, #0xe
         mov r2, r6
         add r2, #0x6a
         strh r0, [r2, #0x0]
         mov r0, #0x0
         ldrsh r1, [r3, r0]
         ldr r0, [r6, #0x5c]
         add r0, r1
         str r0, [r6, #0x5c]
         mov r4, #0x0
         ldrsh r1, [r2, r4]
         ldr r0, [r6, #0x60]
         add r0, r1
         str r0, [r6, #0x60]
         mov r1, #0x0
         mov r10, r3
         mov r9, r2
     271mov r7, #0x0
         lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         bne .L180182
         ldr r0, [pc, #0x8] # REFERENCE_.L17c
         ldrb r1, [r0, #0x6]
         b .L18a187
         .hword 0x0
         .word gSineTable
         .word gStageData
     175mov r0, r5
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
     178lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x4c] # REFERENCE_.L1e4
         add r5, r0, r1
         mov r0, r5
         bl sub_802C0D4-0x4
         cmp r0, #0x0
         bne .L230265
         ldr r0, [r5, #0x4]
         mov r1, #0x20
         and r0, r1
         cmp r0, #0x0
         beq .L1ea231
         ldr r0, [r5, #0x6c]
         cmp r0, r8
         bne .L1ea231
         ldr r1, [r5, #0x14]
         mov r0, #0x80
         lsl r0, #0x2
         add r1, r0
         str r1, [r5, #0x14]
         mov r3, r10
         mov r0, #0x0
         ldrsh r2, [r3, r0]
         ldr r0, [r5, #0x10]
         add r0, r2
         str r0, [r5, #0x10]
         mov r2, r9
         mov r3, #0x0
         ldrsh r0, [r2, r3]
         add r1, r0
         str r1, [r5, #0x14]
         mov r0, r5
         bl sub_801226C-0x4
         cmp r0, #0x0
         bge .L1e8230
         mov r0, r5
         bl Player_HitWithoutRingsUpdate-0x4
         b .L1ea231
         .word gPlayers
     225mov r7, #0x1
     202ldr r1, [r6, #0x5c]
         asr r1, #0x8
         ldr r2, [r6, #0x60]
         asr r2, #0x8
         mov r0, #0x1
         str r0, [sp, #0x0]
         mov r0, r8
         mov r3, r5
         bl sub_8020950-0x4
         mov r1, r0
         mov r0, #0x80
         lsl r0, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L230265
         lsl r1, #0x18
         asr r1, #0x10
         ldr r0, [r5, #0x14]
         add r0, r1
         str r0, [r5, #0x14]
         cmp r7, #0x0
         bne .L230265
         ldrh r0, [r5, #0x1c]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r5, #0x1c]
         ldrh r0, [r5, #0x18]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r5, #0x18]
         ldrh r0, [r5, #0x1a]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r5, #0x1a]
     197mov r1, #0x80
         lsl r1, #0x9
         add r0, r4, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .L166171
         bl .L254
         add sp, #0xc
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

## `sub_8049D70`

```c
void sub_8049D70(void)
{
    Boulder *boulder = TASK_DATA(gCurTask);
    u8 r8_0 = boulder->unk7B;
#ifndef NON_MATCHING
    register u32 r8 asm("r1");
#else
    u32 r8;
#endif
    u8 sp08[4];
    s32 sl;
    u32 theta;
    s32 sinVal, cosVal;
    s32 res;

    sp08[0] = r8_0;

    theta = (r8_0 * 4);
    sinVal = (SIN(theta) * 5) >> 4;
    cosVal = (COS(theta) * 5) >> 4;

    r8 = (u8)(r8_0 + 0x20);
    sp08[0] = r8;

    // TODO/BUG: Is it a bug that this value is only used by case 0's comparison?
    sl = 8;

    if (boulder->unk7A == 1) {
        sl = 4;
    }

    switch (sp08[0] >> 6) {
        case 0: {
            res = sub_80517FC(I(boulder->qWorldY + cosVal), I(boulder->qWorldX), 1, +8, sp08, sub_805217C);
            if (res < sl) {
                boulder->qWorldY += Q(res);

                if (!GetBit(sp08[0], 0)) {
                    boulder->unk7B = sp08[0];
                }
            }
        } break;

        case 1: {
            res = sub_80517FC(I(boulder->qWorldX + sinVal), I(boulder->qWorldY + cosVal), 1, -8, sp08, sub_805203C);
            if (res < 4) {
                boulder->qWorldX -= Q(res);

                if (!GetBit(sp08[0], 0)) {
                    boulder->unk7B = sp08[0];
                }
            }

        } break;

        case 2: {
            res = sub_80517FC(I(boulder->qWorldY + cosVal), I(boulder->qWorldX + sinVal), 1, -8, sp08, sub_805217C);
            if (res < 4) {
                boulder->qWorldY -= Q(res);

                if (!GetBit(sp08[0], 0)) {
                    boulder->unk7B = sp08[0];
                }
            }
        } break;

        case 3: {
            res = sub_80517FC(I(boulder->qWorldX + sinVal), I(boulder->qWorldY + cosVal), 1, +8, sp08, sub_805203C);
            if (res < 4) {
                boulder->qWorldX += Q(res);

                if (!GetBit(sp08[0], 0)) {
                    boulder->unk7B = sp08[0];
                }
            }
        } break;
    }

    if (boulder->unk7A == 2) {

        s32 resN = sub_80517FC(I(boulder->qWorldX - cosVal), I(boulder->qWorldY), 1, -8, sp08, sub_805203C);
        s32 resP = sub_80517FC(I(boulder->qWorldX + cosVal), I(boulder->qWorldY), 1, +8, sp08, sub_805203C);

        if (resN < 0 || resP < 0) {
            boulder->unk7A = 4;
            boulder->qUnk68 = 0;
            boulder->qUnk6C = 0;
            boulder->qUnk70 = 0;

            InitDebrisSprites(boulder);
            sub_8003DF0(SE_BOULDER);
        }

        if (res > 16) {
            boulder->unk7A = 3;
        }
    } else if (boulder->unk7A == 3 || boulder->unk7A == 1) {
        if (res <= 0) {
            if (boulder->unk7A == 1) {
                boulder->unk7A = 2;
                boulder->qUnk68 = 0;
                boulder->qUnk6C = 0;
                boulder->qUnk70 = 0;
            } else {
                boulder->unk7A = 4;
                boulder->qUnk68 = 0;
                boulder->qUnk6C = 0;
                boulder->qUnk70 = 0;

                InitDebrisSprites(boulder);
                sub_8003DF0(SE_BOULDER);
            }
        }
    }

    if (!IsWorldPtActive(I(boulder->qWorldX), I(boulder->qWorldY))) {
        boulder->unk7A = 5;
        sub_8003E28(SE_BOULDER);
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0xc
         ldr r0, [pc, #0x68] # REFERENCE_.L78
         ldr r0, [r0, #0x0]
         ldrh r3, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r6, r3, r0
         add r0, #0x7b
         add r0, r3
         mov r8, r0
         ldrb r1, [r0, #0x0]
         add r0, sp, #0x8
         strb r1, [r0, #0x0]
         ldr r4, [pc, #0x54] # REFERENCE_.L7c
         lsl r0, r1, #0x3
         add r0, r4
         mov r5, #0x0
         ldrsh r2, [r0, r5]
         lsl r0, r2, #0x2
         add r0, r2
         asr r5, r0, #0x4
         lsl r0, r1, #0x3
         mov r2, #0x80
         lsl r2, #0x2
         add r0, r2
         add r0, r4
         mov r4, #0x0
         ldrsh r2, [r0, r4]
         lsl r0, r2, #0x2
         add r0, r2
         asr r0, #0x4
         mov r9, r0
         add r1, #0x20
         lsl r1, #0x18
         lsr r1, #0x18
         add r0, sp, #0x8
         strb r1, [r0, #0x0]
         mov r0, #0x8
         mov r10, r0
         ldr r2, [pc, #0x24] # REFERENCE_.L80
         add r3, r2
         ldrb r0, [r3, #0x0]
         cmp r0, #0x1
         bne .L6651
         mov r4, #0x4
         mov r10, r4
     48lsr r4, r1, #0x6
         cmp r4, #0x1
         beq .Lbc89
         cmp r4, #0x1
         bgt .L8463
         cmp r4, #0x0
         beq .L8e68
         b .L17a179
         .hword 0x0
         .word gCurTask
         .word gSineTable
         .word 0x300007a
     55cmp r4, #0x2
         beq .Lfc119
         cmp r4, #0x3
         beq .L140151
         b .L17a179
     57ldr r0, [r6, #0x64]
         add r0, r9
         asr r0, #0x8
         ldr r1, [r6, #0x60]
         asr r1, #0x8
         add r5, sp, #0x8
         str r5, [sp, #0x0]
         ldr r2, [pc, #0x18] # REFERENCE_.Lb8
         str r2, [sp, #0x4]
         mov r2, #0x1
         mov r3, #0x8
         bl sub_80517FC-0x4
         mov r7, r0
         cmp r7, r10
         bge .L17a179
         lsl r1, r7, #0x8
         ldr r0, [r6, #0x64]
         add r0, r1
         b .L126139
         .hword 0x0
         .word sub_805217C
     53ldr r0, [r6, #0x60]
         add r0, r5
         asr r0, #0x8
         ldr r1, [r6, #0x64]
         add r1, r9
         asr r1, #0x8
         mov r3, #0x8
         neg r3, r3
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x24] # REFERENCE_.Lf8
         str r2, [sp, #0x4]
         mov r2, #0x1
         bl sub_80517FC-0x4
         mov r7, r0
         cmp r7, #0x3
         bgt .L17a179
         lsl r0, r7, #0x8
         ldr r1, [r6, #0x60]
         sub r1, r0
         str r1, [r6, #0x60]
         add r0, sp, #0x8
         ldrb r0, [r0, #0x0]
         and r4, r0
         cmp r4, #0x0
         bne .L17a179
         mov r4, r8
         strb r0, [r4, #0x0]
         b .L17a179
         .word sub_805203C
     64ldr r0, [r6, #0x64]
         add r0, r9
         asr r0, #0x8
         ldr r1, [r6, #0x60]
         add r1, r5
         asr r1, #0x8
         mov r3, #0x8
         neg r3, r3
         add r5, sp, #0x8
         str r5, [sp, #0x0]
         ldr r2, [pc, #0x28] # REFERENCE_.L13c
         str r2, [sp, #0x4]
         mov r2, #0x1
         bl sub_80517FC-0x4
         mov r7, r0
         cmp r7, #0x3
         bgt .L17a179
         lsl r1, r7, #0x8
         ldr r0, [r6, #0x64]
         sub r0, r1
     86str r0, [r6, #0x64]
         add r0, sp, #0x8
         ldrb r1, [r0, #0x0]
         mov r0, #0x1
         and r0, r1
         cmp r0, #0x0
         bne .L17a179
         mov r0, r8
         strb r1, [r0, #0x0]
         b .L17a179
         .hword 0x0
         .word sub_805217C
     66ldr r0, [r6, #0x60]
         add r0, r5
         asr r0, #0x8
         ldr r1, [r6, #0x64]
         add r1, r9
         asr r1, #0x8
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x98] # REFERENCE_.L1ec
         str r2, [sp, #0x4]
         mov r2, #0x1
         mov r3, #0x8
         bl sub_80517FC-0x4
         mov r7, r0
         cmp r7, #0x3
         bgt .L17a179
         lsl r1, r7, #0x8
         ldr r0, [r6, #0x60]
         add r0, r1
         str r0, [r6, #0x60]
         add r0, sp, #0x8
         ldrb r1, [r0, #0x0]
         mov r0, #0x1
         and r0, r1
         cmp r0, #0x0
         bne .L17a179
         mov r4, r8
         strb r1, [r4, #0x0]
     58mov r0, r6
         add r0, #0x7a
         ldrb r1, [r0, #0x0]
         mov r8, r0
         cmp r1, #0x2
         bne .L1f4234
         ldr r0, [r6, #0x60]
         mov r5, r9
         sub r0, r5
         asr r0, #0x8
         ldr r1, [r6, #0x64]
         asr r1, #0x8
         mov r3, #0x8
         neg r3, r3
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r4, [pc, #0x50] # REFERENCE_.L1ec
         str r4, [sp, #0x4]
         mov r2, #0x1
         bl sub_80517FC-0x4
         mov r5, r0
         ldr r0, [r6, #0x60]
         add r0, r9
         asr r0, #0x8
         ldr r1, [r6, #0x64]
         asr r1, #0x8
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         str r4, [sp, #0x4]
         mov r2, #0x1
         mov r3, #0x8
         bl sub_80517FC-0x4
         cmp r5, #0x0
         blt .L1c6215
         cmp r0, #0x0
         bge .L1e0226
     212mov r0, #0x0
         mov r1, #0x4
         mov r4, r8
         strb r1, [r4, #0x0]
         str r0, [r6, #0x68]
         str r0, [r6, #0x6c]
         str r0, [r6, #0x70]
         mov r0, r6
         bl InitDebrisSprites-0x4
         ldr r0, [pc, #0x14] # REFERENCE_.L1f0
         bl sub_8003DF0-0x4
     214cmp r7, #0x10
         ble .L22e261
         mov r0, #0x3
         mov r5, r8
         strb r0, [r5, #0x0]
         b .L22e261
         .word sub_805203C
         .word 0x246
     184cmp r1, #0x3
         beq .L1fc238
         cmp r1, #0x1
         bne .L22e261
     235cmp r7, #0x0
         bgt .L22e261
         cmp r1, #0x1
         bne .L214250
         mov r1, #0x0
         mov r0, #0x2
         mov r2, r8
         strb r0, [r2, #0x0]
         str r1, [r6, #0x68]
         str r1, [r6, #0x6c]
         str r1, [r6, #0x70]
         b .L22e261
     241mov r0, #0x0
         mov r1, #0x4
         mov r4, r8
         strb r1, [r4, #0x0]
         str r0, [r6, #0x68]
         str r0, [r6, #0x6c]
         str r0, [r6, #0x70]
         mov r0, r6
         bl InitDebrisSprites-0x4
         ldr r0, [pc, #0x30] # REFERENCE_.L25c
         bl sub_8003DF0-0x4
     227ldr r0, [r6, #0x60]
         asr r0, #0x8
         ldr r1, [r6, #0x64]
         asr r1, #0x8
         bl IsWorldPtActive-0x4
         cmp r0, #0x0
         bne .L24a273
         mov r0, #0x5
         mov r5, r8
         strb r0, [r5, #0x0]
         ldr r0, [pc, #0x14] # REFERENCE_.L25c
         bl sub_8003E28-0x4
     267add sp, #0xc
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x246
```

## `Task_ButtonPlatformInit`

```c
static void Task_ButtonPlatformInit(void)
{
    ButtonPlatform *platform = TASK_DATA(gCurTask);
    s16 sl = 0;
    Sprite *s = &platform->s;
    MapEntity *me = platform->base.me;
    s16 i;
    s32 qWorldX, qWorldY;
    s32 dx, dy;
    s32 qPathTop, qPathBottom;
    s32 qPathLeft, qPathRight;
    s32 qPathHalfWidth, qPathHalfHeight;
    s32 qPathMiddleX, qPathMiddleY;

    if (platform->isActive == TRUE) {
        qWorldX = Q(TO_WORLD_POS(platform->base.meX, platform->base.regionX));
        qWorldY = Q(TO_WORLD_POS(me->y, platform->base.regionY));

        platform->theta = ((gStageData.timer + (platform->unk3C >> 2)) & 0xFF) << 2;

        qPathTop = qWorldY + Q(me->d.sData[1] * TILE_WIDTH);
        qPathHalfHeight = Q(me->d.uData[3] * (TILE_WIDTH / 2));
        qPathLeft = qWorldX + Q(me->d.sData[0] * TILE_WIDTH);
        qPathHalfWidth = Q(me->d.uData[2] * (TILE_WIDTH / 2));
        qPathMiddleX = qPathLeft + qPathHalfWidth;
        qPathMiddleY = qPathTop + qPathHalfHeight;

        {
            dx = platform->qWorldX;
            dy = platform->qWorldY;

            platform->qWorldX = qPathMiddleX + ((SIN(platform->theta) * qPathHalfWidth) >> 14);
            platform->qWorldY = qPathMiddleY + ((SIN(platform->theta) * qPathHalfHeight) >> 14);

            dx = dx - platform->qWorldX;
            dy = dy - platform->qWorldY;
        }

        for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
            Player *p = GET_SP_PLAYER_V0(i);
            u32 res;

            if (!sub_802C0D4(p)) {
                if ((p->moveState & MOVESTATE_COLLIDING_ENT) && (p->sprColliding == s)) {
                    p->qWorldX -= dx;
                    p->qWorldY -= dy - Q(4);

                    sl = +1;
                } else if (sl == 0) {
                    sl = -1;
                }

                // NOTE/BUG?: I(...) on integer values
                res = sub_8020950(s, I(platform->qWorldX), I(platform->qWorldY), p, 0);

                if (res & 0x10000) {
                    p->qWorldY += Q_8_8(res);
                }
            }
        }

        if (sl != 0) {
            if ((sl == +1) && (platform->unk40 < 16)) {
                platform->unk40++;
            } else if ((sl == -1) && (platform->unk40 > 0)) {
                platform->unk40--;
            }
        }

        platform->qWorldY += (SIN(platform->unk40 * 16) >> 5);
    }

    sub_8038988();
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0xc
         ldr r0, [pc, #0xbc] # REFERENCE_.Lcc
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r12, r0
         mov r0, #0xc0
         lsl r0, #0x12
         mov r1, r12
         add r7, r1, r0
         mov r3, #0x0
         mov r10, r3
         add r0, #0xc
         add r0, r12
         str r0, [sp, #0x4]
         ldr r5, [r7, #0x0]
         ldr r0, [pc, #0xa4] # REFERENCE_.Ld0
         add r0, r12
         ldrb r0, [r0, #0x0]
         cmp r0, #0x1
         beq .L3426
         b .L1bc213
     24ldrb r3, [r7, #0xa]
         lsl r3, #0x3
         ldrh r0, [r7, #0x4]
         lsl r0, #0x8
         add r3, r0
         lsl r3, #0x8
         ldrb r2, [r5, #0x1]
         lsl r2, #0x3
         ldrh r0, [r7, #0x6]
         lsl r0, #0x8
         add r2, r0
         lsl r2, #0x8
         ldr r0, [pc, #0x84] # REFERENCE_.Ld4
         ldr r1, [r0, #0x1c]
         ldrh r0, [r7, #0x3c]
         lsr r0, #0x2
         add r1, r0
         mov r0, #0xff
         and r1, r0
         lsl r1, #0x2
         strh r1, [r7, #0x3e]
         mov r0, #0x4
         ldrsb r0, [r5, r0]
         lsl r0, #0xb
         add r2, r0
         ldrb r4, [r5, #0x6]
         lsl r4, #0xa
         mov r0, #0x3
         ldrsb r0, [r5, r0]
         lsl r0, #0xb
         add r3, r0
         ldrb r1, [r5, #0x5]
         lsl r1, #0xa
         add r3, r1
         str r3, [sp, #0x8]
         add r2, r4
         ldr r3, [r7, #0x34]
         mov r9, r3
         ldr r0, [r7, #0x38]
         mov r8, r0
         ldr r5, [pc, #0x50] # REFERENCE_.Ld8
         ldrh r0, [r7, #0x3e]
         lsl r0, #0x1
         add r0, r5
         mov r3, #0x0
         ldrsh r0, [r0, r3]
         mul r0, r1
         asr r0, #0xe
         ldr r1, [sp, #0x8]
         add r3, r1, r0
         str r3, [r7, #0x34]
         ldrh r0, [r7, #0x3e]
         lsl r0, #0x1
         add r0, r5
         mov r1, #0x0
         ldrsh r0, [r0, r1]
         mul r0, r4
         asr r0, #0xe
         add r2, r0
         str r2, [r7, #0x38]
         mov r0, r9
         sub r0, r3
         mov r9, r0
         mov r1, r8
         sub r1, r2
         mov r8, r1
         mov r1, #0x0
         ldr r5, [pc, #0x20] # REFERENCE_.Ldc
         add r5, r12
     178lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         bne .Le0107
         ldr r0, [pc, #0xc] # REFERENCE_.Ld4
         ldrb r1, [r0, #0x6]
         b .Lea112
         .word gCurTask
         .word 0x3000043
         .word gStageData
         .word gSineTable
         .word 0x3000040
     98mov r0, r6
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
     101lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x38] # REFERENCE_.L130
         add r6, r0, r1
         mov r0, r6
         bl sub_802C0D4-0x4
         cmp r0, #0x0
         bne .L168172
         ldr r0, [r6, #0x4]
         mov r1, #0x20
         and r0, r1
         cmp r0, #0x0
         beq .L134147
         ldr r0, [r6, #0x6c]
         ldr r3, [sp, #0x4]
         cmp r0, r3
         bne .L134147
         ldr r0, [r6, #0x10]
         mov r1, r9
         sub r0, r1
         str r0, [r6, #0x10]
         ldr r0, [r6, #0x14]
         mov r3, #0x80
         lsl r3, #0x3
         add r0, r3
         mov r1, r8
         sub r0, r1
         str r0, [r6, #0x14]
         mov r3, #0x1
         mov r10, r3
         b .L13e152
         .word gPlayers
     127mov r0, r10
         cmp r0, #0x0
         bne .L13e152
         ldr r1, [pc, #0x54] # REFERENCE_.L190
         mov r10, r1
     145ldr r1, [r7, #0x34]
         asr r1, #0x8
         ldr r2, [r7, #0x38]
         asr r2, #0x8
         mov r0, #0x0
         str r0, [sp, #0x0]
         ldr r0, [sp, #0x4]
         mov r3, r6
         bl sub_8020950-0x4
         mov r1, r0
         mov r0, #0x80
         lsl r0, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L168172
         lsl r1, #0x18
         asr r1, #0x10
         ldr r0, [r6, #0x14]
         add r0, r1
         str r0, [r6, #0x14]
     122mov r3, #0x80
         lsl r3, #0x9
         add r0, r4, r3
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .Lbe95
         mov r1, r10
         lsl r0, r1, #0x10
         asr r2, r0, #0x10
         mov r1, r0
         cmp r2, #0x0
         beq .L1a8203
         cmp r2, #0x1
         bne .L194193
         ldrb r0, [r5, #0x0]
         cmp r0, #0xf
         bhi .L194193
         add r0, #0x1
         b .L1a6202
         .word 0xffff
     186asr r1, #0x10
         mov r0, #0x1
         neg r0, r0
         cmp r1, r0
         bne .L1a8203
         ldrb r0, [r5, #0x0]
         cmp r0, #0x0
         beq .L1a8203
         sub r0, #0x1
     191strb r0, [r5, #0x0]
     184ldr r1, [pc, #0x24] # REFERENCE_.L1d0
         ldrb r0, [r5, #0x0]
         lsl r0, #0x5
         add r0, r1
         ldrh r1, [r0, #0x0]
         lsl r1, #0x10
         asr r1, #0x15
         ldr r0, [r7, #0x38]
         add r0, r1
         str r0, [r7, #0x38]
     25bl .L24c
         add sp, #0xc
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gSineTable
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8078F74
sub_8078F74: @ 0x08078F74
	push {r4, r5, r6, r7, lr}
	mov r7, sl
	mov r6, sb
	mov r5, r8
	push {r5, r6, r7}
	sub sp, #0x20
	str r0, [sp, #0x14]
	mov sl, r2
	mov sb, r3
	ldr r0, [sp, #0x40]
	lsls r1, r1, #0x18
	lsls r0, r0, #0x10
	lsrs r0, r0, #0x10
	lsrs r1, r1, #8
	ldr r2, _08079014 @ =0xFFFF0000
	adds r1, r1, r2
	lsrs r7, r1, #0x10
	lsls r1, r7, #0x10
	cmp r1, #0
	bge _08078F9E
	b _08079180
_08078F9E:
	lsls r0, r0, #0x10
	asrs r0, r0, #0x10
	str r0, [sp, #0x18]
	lsls r0, r0, #1
	ldr r3, _08079018 @ =gSineTable
	adds r0, r0, r3
	str r0, [sp, #0x1c]
_08078FAC:
	asrs r0, r1, #0xe
	ldr r4, [sp, #0x14]
	adds r0, r0, r4
	ldr r5, [r0]
	ldr r1, _0807901C @ =0x040000D4
	adds r0, r5, #0
	adds r0, #0x10
	str r0, [r1]
	add r0, sp, #8
	str r0, [r1, #4]
	ldr r0, _08079020 @ =0x84000001
	str r0, [r1, #8]
	ldr r0, [r1, #8]
	ldr r1, [sp, #0x18]
	cmp r1, #0
	beq _08079024
	movs r2, #0x80
	lsls r2, r2, #1
	adds r0, r1, r2
	lsls r0, r0, #1
	ldr r3, _08079018 @ =gSineTable
	adds r0, r0, r3
	movs r4, #0
	ldrsh r3, [r0, r4]
	movs r1, #0xc
	ldrsh r0, [r5, r1]
	adds r1, r3, #0
	muls r1, r0, r1
	asrs r1, r1, #6
	ldr r4, [sp, #0x1c]
	movs r0, #0
	ldrsh r2, [r4, r0]
	movs r4, #0xe
	ldrsh r0, [r5, r4]
	muls r0, r2, r0
	asrs r0, r0, #6
	subs r1, r1, r0
	str r1, [sp, #0xc]
	movs r1, #0xc
	ldrsh r0, [r5, r1]
	adds r1, r2, #0
	muls r1, r0, r1
	asrs r1, r1, #6
	movs r2, #0xe
	ldrsh r0, [r5, r2]
	muls r0, r3, r0
	asrs r0, r0, #6
	adds r1, r1, r0
	add r0, sp, #0xc
	str r1, [r0, #4]
	b _08079036
	.align 2, 0
_08079014: .4byte 0xFFFF0000
_08079018: .4byte gSineTable
_0807901C: .4byte 0x040000D4
_08079020: .4byte 0x84000001
_08079024:
	movs r3, #0xc
	ldrsh r0, [r5, r3]
	lsls r0, r0, #8
	str r0, [sp, #0xc]
	movs r4, #0xe
	ldrsh r0, [r5, r4]
	lsls r0, r0, #8
	add r1, sp, #0xc
	str r0, [r1, #4]
_08079036:
	mov r0, sb
	movs r2, #0
	ldrsh r1, [r0, r2]
	movs r0, #0x80
	lsls r0, r0, #1
	cmp r1, r0
	bne _08079058
	mov r3, sb
	movs r4, #2
	ldrsh r0, [r3, r4]
	lsls r2, r7, #0x10
	mov r8, r2
	mov r3, sl
	ldr r4, [r3]
	ldr r6, [r3, #4]
	cmp r0, r1
	beq _080790A0
_08079058:
	mov r4, sb
	movs r0, #0
	ldrsh r1, [r4, r0]
	ldr r0, [sp, #0xc]
	muls r0, r1, r0
	asrs r0, r0, #8
	str r0, [sp, #0xc]
	movs r2, #2
	ldrsh r1, [r4, r2]
	ldr r0, [sp, #0x10]
	muls r0, r1, r0
	asrs r0, r0, #8
	str r0, [sp, #0x10]
	movs r3, #0
	lsls r7, r7, #0x10
	mov r8, r7
	mov r7, sl
	ldr r4, [r7]
	ldr r6, [r7, #4]
_0807907E:
	lsls r0, r3, #1
	mov r2, sp
	adds r2, r2, r0
	adds r2, #8
	add r0, sb
	movs r7, #0
	ldrsh r1, [r0, r7]
	movs r7, #0
	ldrsh r0, [r2, r7]
	muls r0, r1, r0
	asrs r0, r0, #8
	strh r0, [r2]
	adds r0, r3, #1
	lsls r0, r0, #0x18
	lsrs r3, r0, #0x18
	cmp r3, #1
	bls _0807907E
_080790A0:
	ldr r0, [sp, #0xc]
	adds r0, r4, r0
	str r0, [sp, #0xc]
	add r2, sp, #0xc
	ldr r0, [r2, #4]
	adds r0, r6, r0
	str r0, [r2, #4]
	ldrh r0, [r5, #0xa]
	ldr r1, [sp, #0x18]
	adds r4, r1, r0
	ldr r3, _0807911C @ =0x000003FF
	adds r0, r3, #0
	ands r4, r0
	strh r4, [r5, #0x2c]
	ldrb r0, [r5, #2]
	cmp r0, #0
	beq _080790D4
	adds r0, r5, #0
	adds r0, #0x30
	ldrb r1, [r5, #2]
	str r4, [sp]
	ldr r7, [sp, #0x44]
	str r7, [sp, #4]
	add r3, sp, #8
	bl sub_8078F74
_080790D4:
	ldr r1, [sp, #0x44]
	ldrb r0, [r1]
	adds r0, #1
	strb r0, [r1]
	ldr r2, _08079120 @ =gCamera
	ldr r1, [r2]
	lsls r1, r1, #8
	ldr r0, [sp, #0xc]
	adds r0, r0, r1
	str r0, [r5, #0xc]
	ldr r1, [r2, #4]
	lsls r1, r1, #8
	ldr r0, [sp, #0x10]
	adds r0, r0, r1
	str r0, [r5, #8]
	mov r2, r8
	asrs r0, r2, #0x10
	ldr r3, [sp, #0x44]
	ldrb r3, [r3]
	adds r0, r0, r3
	movs r1, #2
	ands r0, r1
	cmp r0, #0
	beq _08079128
	movs r7, #0x80
	lsls r7, r7, #1
	adds r0, r4, r7
	lsls r0, r0, #1
	ldr r1, _08079124 @ =gSineTable
	adds r0, r0, r1
	ldrh r0, [r0]
	lsls r0, r0, #0x10
	asrs r0, r0, #0x14
	strh r0, [r5, #0x10]
	adds r3, r1, #0
	b _0807913E
	.align 2, 0
_0807911C: .4byte 0x000003FF
_08079120: .4byte gCamera
_08079124: .4byte gSineTable
_08079128:
	movs r2, #0x80
	lsls r2, r2, #1
	adds r0, r4, r2
	lsls r0, r0, #1
	ldr r3, _08079160 @ =gSineTable
	adds r0, r0, r3
	movs r7, #0
	ldrsh r0, [r0, r7]
	rsbs r0, r0, #0
	asrs r0, r0, #4
	strh r0, [r5, #0x10]
_0807913E:
	lsls r2, r4, #0x10
	mov r1, r8
	asrs r0, r1, #0x10
	ldr r4, [sp, #0x44]
	ldrb r4, [r4]
	adds r0, r0, r4
	movs r1, #4
	ands r0, r1
	cmp r0, #0
	beq _08079164
	lsrs r0, r2, #0xf
	adds r0, r0, r3
	ldrh r0, [r0]
	lsls r0, r0, #0x10
	asrs r0, r0, #0x14
	b _08079170
	.align 2, 0
_08079160: .4byte gSineTable
_08079164:
	lsrs r0, r2, #0xf
	adds r0, r0, r3
	movs r7, #0
	ldrsh r0, [r0, r7]
	rsbs r0, r0, #0
	asrs r0, r0, #4
_08079170:
	strh r0, [r5, #0x12]
	ldr r0, _08079190 @ =0xFFFF0000
	add r0, r8
	lsrs r7, r0, #0x10
	lsls r1, r7, #0x10
	cmp r1, #0
	blt _08079180
	b _08078FAC
_08079180:
	add sp, #0x20
	pop {r3, r4, r5}
	mov r8, r3
	mov sb, r4
	mov sl, r5
	pop {r4, r5, r6, r7}
	pop {r0}
	bx r0
	.align 2, 0
_08079190: .4byte 0xFFFF0000
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
