#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Position {
    int x;
    int y;
};

int main()
{
	char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];
    char visited[10000][10];
    
    struct Position head, tail;
    head.x = head.y = 0;
    tail.x = tail.y = 0;

    int v = 0;

    while(fgets(line, sizeof(line), file)) {
        char direction;
        int steps;

        char *lineSplit = strtok(line, " ");
        direction = lineSplit[0];
        lineSplit = strtok(NULL, " ");
        steps = strtol(lineSplit, NULL, 10);

        for(int i = 0; i < steps; i++) {
            struct Position lastPos;
            lastPos.x = head.x;
            lastPos.y = head.y;
            switch (direction) {
                case 'R':
                    head.x++;
                    break;
                case 'L':
                    head.x--;
                    break;
                case 'U':
                    head.y++;
                    break;
                case 'D':
                    head.y--;
                    break;
            }

            if(abs(head.x - tail.x) > 1 || abs(head.y - tail.y) > 1) {       
                tail.x = lastPos.x;
                tail.y = lastPos.y;
            }

            char newPos[10];
            snprintf(newPos, sizeof(newPos), "%d,%d", tail.x, tail.y);
            int found = 0;
            
            for(int j = 0; j < v; j++) {
                if(!strcmp(visited[j], newPos)) {
                    found = 1;
                    break;
                }
            }
            if(!found) {
                snprintf(visited[v], sizeof(visited[v]), "%s", newPos); 
                v++;
            }
        }
    }

    printf("%d", v);

    fclose(file);

    return 0;
}